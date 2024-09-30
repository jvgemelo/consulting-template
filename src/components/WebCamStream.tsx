import React, { useRef, useEffect } from 'react';

const WebcamStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error al acceder a la webcam: ", err);
      }
    };

    startVideo();

    // Cleanup function para detener el stream cuando el componente se desmonte
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default WebcamStream;
