import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
  const [noteText, setNoteText] = useState('');
  const [noteColor, setNoteColor] = useState('');
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [viewArchived, setViewArchived] = useState(false);

  const apiKey = 'e18562991b502bea61cd64aa6432f927';

  useEffect(() => {
    loadNotes();
  }, [searchTerm, darkMode, viewArchived]);

  function loadNotes() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const storedArchivedNotes = JSON.parse(localStorage.getItem('archivedNotes')) || [];

    if (viewArchived) {
      setArchivedNotes(storedArchivedNotes);
    } else {
      const filteredNotes = storedNotes.filter((note) =>
        note.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setNotes(filteredNotes);
    }
  }

  async function fetchWeather() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      console.log('Weather API Response:', response.data);

      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  }

  function addOrUpdateNote() {
    if (selectedNoteIndex === -1) {
      // Add new note
      const newNote = {
        text: noteText.trim(),
        color: noteColor || getRandomColor(),
      };

      setNotes([...notes, newNote]);
    } else {
      // Update existing note
      const updatedNotes = [...notes];
      updatedNotes[selectedNoteIndex] = {
        text: noteText.trim(),
        color: noteColor || getRandomColor(),
      };

      setNotes(updatedNotes);
      setSelectedNoteIndex(-1);
    }

    // Clear input fields
    setNoteText('');
    setNoteColor('');

    // Save to local storage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Fetch weather data when a new note is added
    fetchWeather();
  }

  function deleteNote() {
    if (selectedNoteIndex !== -1) {
      const updatedNotes = notes.filter((_, index) => index !== selectedNoteIndex);
      setNotes(updatedNotes);
      setSelectedNoteIndex(-1);

      // Save to local storage
      localStorage.setItem('notes', JSON.stringify(updatedNotes));

      // Fetch weather data when a note is deleted
      fetchWeather();
    }
  }

  function archiveNote() {
    if (selectedNoteIndex !== -1) {
      const archivedNote = notes[selectedNoteIndex];
      setArchivedNotes((prevArchivedNotes) => [...prevArchivedNotes, archivedNote]);
  
      const updatedNotes = notes.filter((_, index) => index !== selectedNoteIndex);
      setNotes(updatedNotes);
      setSelectedNoteIndex(-1);
  
      // Save to local storage
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      localStorage.setItem('archivedNotes', JSON.stringify([...archivedNotes, archivedNote]));
    }
  }
  

  function changeNoteColor(color) {
    setNoteColor(color);
  }

  function selectNote(index) {
    setSelectedNoteIndex(index);
    setNoteText(index !== -1 ? notes[index].text : '');
    setNoteColor(index !== -1 ? notes[index].color : '');
  }

  function getRandomColor() {
    const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleViewArchived = () => {
    setViewArchived(!viewArchived);
  };

  function removeArchivedNote(index) {
    const updatedArchivedNotes = archivedNotes.filter((_, i) => i !== index);
    setArchivedNotes(updatedArchivedNotes);
    localStorage.setItem('archivedNotes', JSON.stringify(updatedArchivedNotes));
  }

  function restoreNoteFromArchive(index) {
    const restoredNote = archivedNotes[index];
    setNotes([...notes, restoredNote]);

    const updatedArchivedNotes = archivedNotes.filter((_, i) => i !== index);
    setArchivedNotes(updatedArchivedNotes);

    localStorage.setItem('notes', JSON.stringify([...notes, restoredNote]));
    localStorage.setItem('archivedNotes', JSON.stringify(updatedArchivedNotes));
  }

  return (
    <div id="app" className={darkMode ? 'dark-mode' : ''}>
      <div id="note-container">
        
        {viewArchived && (
          <h2>Archived Notes</h2>
        )}
        
        {viewArchived
          ? archivedNotes.map((note, index) => (
              <div key={index} className="archived-note">
                {note.text}
                <div>
                  <button onClick={() => removeArchivedNote(index)}>Remove</button>
                  <button onClick={() => restoreNoteFromArchive(index)}>Restore</button>
                </div>
              </div>
            ))
          : notes.map((note, index) => (
              <div
                key={index}
                className={`note ${selectedNoteIndex === index ? 'selected' : ''}`}
                style={{ backgroundColor: note.color }}
                onClick={() => selectNote(index)}
              >
                {note.text}
              </div>
            ))}
      </div>
      <div id="controls">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Type your note here..."
        ></textarea>
        <button onClick={addOrUpdateNote}>Add/Edit Note</button>
        <button onClick={deleteNote}>Delete Note</button>
        <button onClick={archiveNote}>Archive Note</button>
        <label htmlFor="color-selector">Select Color:</label>
        <select
          id="color-selector"
          value={noteColor}
          onChange={(e) => changeNoteColor(e.target.value)}
        >
          <option value="">Select</option>
          <option value="#3498db">Blue</option>
          <option value="#e74c3c">Red</option>
          <option value="#2ecc71">Green</option>
          <option value="#f39c12">Yellow</option>
          <option value="#9b59b6">Purple</option>
          <option value="#1abc9c">Turquoise</option>
        </select>

        {/* Weather Section */}
        <div>
          <label htmlFor="city-input">Enter City:</label>
          <input
            type="text"
            id="city-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Get Weather</button>

          {weather && (
            <div>
              <h2>Weather in {weather.name}, {weather.sys.country}</h2>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Description: {weather.weather[0].description}</p>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={loadNotes}
        />

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>

        {/* Toggle View Button */}
        <button onClick={toggleViewArchived}>
          {viewArchived ? 'View Active Notes' : 'View Archived Notes'}
        </button>
      </div>
    </div>
  );
}

export default App;
