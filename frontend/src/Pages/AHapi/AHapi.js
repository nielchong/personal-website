import './AHapi.css';
import FetchKnowledgeList from '../../Components/FetchKnowledgeList';
import CreateKnowledgeForm from '../../Components/CreateKnowledgeForm';
import Layout from '../../Components/Layout';

function AHapi() {

    const apiUrl = 'http://47.128.148.123/v1/datasets';

    const apiKey = 'dataset-03Z9UFsnQMyzR9Z6ToG4RgMK';
  
    const page = 1;
    const limit = 20;

    const handleCreate = (newData) => {
      window.location.reload(); 
    };

    const renderData = (data, documents, loadingDocuments, errorDocuments, handleDelete) => (
      <ul>
        {data.data.map(item => (
          <li key={item.id}>
            <div>
              <h3>{item.name}</h3>
              {loadingDocuments[item.id] && <p>Loading documents...</p>}
              {errorDocuments[item.id] && <p>Error: {errorDocuments[item.id].message}</p>}
              {documents[item.id] && (
                <ul>
                  {documents[item.id].length > 0 ? (
                    documents[item.id].map(document => (
                      <li key={document.id}>{document.name}</li>
                    ))
                  ) : (
                    <p></p>
                  )}
                </ul>
              )}
              <button onClick={() => handleDelete(item.id)}>Delete Knowledge</button>
            </div>
          </li>
        ))}
      </ul>
    );

  return (
    <Layout>
        <div className="App">
        <header className="App-header">
            <p>
            Knowledge Repository
            </p>
        </header>

        <main className="App-body">
            <div>
            <CreateKnowledgeForm apiUrl={apiUrl} apiKey={apiKey} onCreate={handleCreate} />
                
                <p className="underline">Current Knowledge List</p>
                
            <FetchKnowledgeList
                apiUrl={apiUrl}
                page={page}
                limit={limit}
                apiKey={apiKey}
                render={renderData}
        />

            </div>

            {/* <EmptyButton text="Upload Document" />

            <EmptyButton text="Delete Document" /> */}
        </main>
        </div>
    </Layout>
  );
}

export default AHapi;