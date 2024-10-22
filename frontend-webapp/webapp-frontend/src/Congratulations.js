import React from 'react';

function Congratulations() {
  return (
    <div style={styles.container}>
      <h1>Congratulations!</h1>
      <p>You have achieved your goal!</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    color: '#333',
  }
};

export default Congratulations;
