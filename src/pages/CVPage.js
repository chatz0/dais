
import React from 'react';

const CVPage = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', background: 'white', color: 'black', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ textAlign: 'center' }}>Dimitris Chatzopoulos</h1>
      <hr />
      <section>
        <h2>Contact Information</h2>
        <p>Email: dimitris.chatzopoulos@ucd.ie</p>
        <p>Website: https://people.ucd.ie/dimitris.chatzopoulos</p>
      </section>
      <section>
        <h2>Research Interests</h2>
        <p>Artificial Intelligence, Distributed Systems, Edge Computing, Decentralized AI.</p>
      </section>
      <section>
        <h2>Education</h2>
        <ul>
          <li>Ph.D. in Computer Science, [University], [Year]</li>
        </ul>
      </section>
      <section>
        <h2>Employment</h2>
        <ul>
          <li>Assistant Professor & Ad Astra Fellow, University College Dublin</li>
        </ul>
      </section>
      <section>
        <h2>Selected Publications</h2>
        <ol>
          <li><strong>D. Chatzopoulos</strong>, et al., "Trustworthiness in Decentralized AI Systems", 2024.</li>
          <li><strong>D. Chatzopoulos</strong>, et al., "Edge AI for Real-Time Analytics", 2023.</li>
        </ol>
      </section>
      <section>
        <h2>Teaching</h2>
        <ul>
          <li>Cloud Computing (Final Year Undergraduate)</li>
          <li>Distributed Systems (MSc Level)</li>
        </ul>
      </section>
    </div>
  );
};

export default CVPage;
