import React, { useState } from 'react';

const CreateKnowledgeForm = ({ apiUrl, apiKey, onCreate }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setName('');
      setError(null);
      onCreate(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter knowledge name"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create New Knowledge'}
        </button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateKnowledgeForm;