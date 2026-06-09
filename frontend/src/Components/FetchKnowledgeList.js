import React, { useState, useEffect } from 'react';

const FetchKnowledgeList = ({ apiUrl, page, limit, apiKey, render }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState({});
  const [loadingDocuments, setLoadingDocuments] = useState({});
  const [errorDocuments, setErrorDocuments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${apiUrl}?page=${page}&limit=${limit}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);

        data.data.forEach(item => {
          fetchDocuments(item.id);
        });

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, page, limit, apiKey]);

  const fetchDocuments = async (datasetId) => {
    setLoadingDocuments(prevState => ({ ...prevState, [datasetId]: true }));
    setErrorDocuments(prevState => ({ ...prevState, [datasetId]: null }));

    try {
      const url = `${apiUrl}/${datasetId}/documents`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDocuments(prevState => ({ ...prevState, [datasetId]: data.data || [] }));
    } catch (error) {
      setErrorDocuments(prevState => ({ ...prevState, [datasetId]: error }));
    } finally {
      setLoadingDocuments(prevState => ({ ...prevState, [datasetId]: false }));
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      setData(prevData => ({
        ...prevData,
        data: prevData.data.filter(item => item.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting knowledge entry:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return render(data, documents, loadingDocuments, errorDocuments, handleDelete);
};

export default FetchKnowledgeList;