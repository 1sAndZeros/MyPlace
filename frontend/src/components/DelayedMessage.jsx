import { useState, useEffect } from 'react';

export default function DelayedMessage({
  delay = 3000,
  message = 'Please wait...',
}) {
  const [messageToShow, setMessageToShow] = useState(null);

  useEffect(() => {
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      setMessageToShow(message);
    }, delay);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs only once

  return messageToShow && <p style={{ marginTop: '1rem' }}>{messageToShow}</p>;
}
