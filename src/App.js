import './App.css';
import Story from './Story';

import json from './stories.json'
import { useEffect, useState } from 'react';

function App() {

  const [results, setResults] = useState([])

  useEffect(() => {
    const stories = json.stories;
    const mapAdnArr = (arr) => {
      const res = !Array.isArray(arr) && arr ? [arr] : arr
      const filtered = res.filter(k => !!k)
      const mapped = filtered.map(word => !!word.$ ? word.$ : word)
      return mapped;

    }
    const mapAdnResult = (result) => ({
      keywords: mapAdnArr(result?.Keywords?.Keyword || []),
      locations: mapAdnArr(result?.Places?.Place || []),
      people: mapAdnArr(result?.People?.Person || []),
      organisations: mapAdnArr(result?.Companies?.Company || [])
    })

    const getAwsArr = (arr) => {
      if (!arr) return [];
      return Array.isArray(arr) ? arr : [arr];
    }

    const mapAwsResult = (result) => ({
      keywords: getAwsArr(result?.keywords?.keyword),
      locations: getAwsArr(result?.geoPlaces?.geoPlace),
      people: getAwsArr(result?.persons?.person),
      organisations: getAwsArr(result?.organisations?.organisation)
    })

    const mapStory = (story) => ({
      adn: mapAdnResult(story.adnResults),
      aws: mapAwsResult(story.awsResults),
      headline: story.headline,
      summary: story.summary,
      paragraphs: story.paragraphs
    })

    const res = stories.map(mapStory)
    setResults(res);
  }, [])

  return (
    <div className="App">
      {results.map((story) => <Story key={`story-container-${story.headline.split(' ').join('')}`} story={story} />)}
    </div>
  );
}

export default App;
