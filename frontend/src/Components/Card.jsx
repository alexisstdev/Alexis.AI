import './Card.css';

export default function Card({ photo, name, prompt }) {
  return (
    <div className='card'>
      <img src={photo} alt='' />
      <div className='card-description'>
        <h2>{name.length > 100 ? name.slice(0, 100) + '...' : name}</h2>
        <p>{prompt.length > 100 ? prompt.slice(0, 100) + '...' : prompt}</p>
      </div>
    </div>
  );
}
