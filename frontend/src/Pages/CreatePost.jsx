import './CreatePost.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Components/index';
import { getRandomPrompt } from '../utils';

export default function CreatePost() {
  const [generatingImage, setGeneratingImage] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.prompt || !form.photo || !form.name) {
      alert('Fill the fields and generate an image');
      return;
    }
    setUploading(true);
    try {
      const res = await fetch('https://alexisdev-ai.onrender.com/api/v1/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      await res.json();
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  async function generateImage() {
    if (!form.prompt) {
      alert('Please enter a prompt');
      return;
    }

    try {
      setGeneratingImage(true);
      const res = await fetch('https://alexisdev-ai.onrender.com/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      const data = await res.json();
      setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
    } catch (err) {
      console.log(err);
    } finally {
      setGeneratingImage(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSurpriseMe() {
    setForm((prev) => ({
      ...prev,
      prompt: getRandomPrompt(form.prompt),
    }));
  }

  return (
    <>
      {!uploading ? (
        <div className='create'>
          <form onSubmit={handleSubmit} className='form'>
            <h1 className='create-title'>Create</h1>
            <p className='create-description'>
              Create visually stunning images trough DALL-E AI and share them with the
              community.
            </p>
            <label htmlFor='name'>Name of the image</label>
            <input
              type='name'
              name='name'
              id='name'
              placeholder='Title'
              onChange={handleChange}
              value={form.name}
            />
            <label htmlFor='name'>
              Prompt
              <input
                type='button'
                className='btn secondary'
                onClick={handleSurpriseMe}
                value='Surprise me'
              />
            </label>
            <textarea
              rows='4'
              type='text'
              name='prompt'
              id='prompt'
              className='form-prompt'
              placeholder='A bicycle made of flowers with a basket of butterflies'
              onChange={handleChange}
              value={form.prompt}
            />
            <div className='form-buttons'>
              <input
                type='button'
                value='Generate image'
                className='btn'
                onClick={generateImage}
              />
              <input type='submit' value='Share with the community' className='btn' />
            </div>
          </form>
          <div className='form-image'>
            {generatingImage && (
              <div className='generating-img'>
                <Loader />
              </div>
            )}
            <div className={`${generatingImage ? 'display-none' : 'display-block'}`}>
              {form.photo ? <img src={form.photo} /> : <img src='/preview.png' />}
            </div>
          </div>
        </div>
      ) : (
        <div className='uploading-img'>
          <Loader />
        </div>
      )}
    </>
  );
}
