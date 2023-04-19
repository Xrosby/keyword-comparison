const Story = ({ story }) => {
    const keywordColor = {
        keywords: 'rgba(0,0,0,0.1)',
        locations: 'rgba(255,0,0,0.1)',
        organisations: 'rgba(0,255,0,0.1)',
        people: 'rgba(0,0,255,0.1)'
    }


    const renderResults = (result) => (
        <div>
            {Object.keys(result).map(key => (
                <div key={`word-container-${key}`} style={{ textAlign: 'left' }}>
                    <h4 key={`headline-${key}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                    {result[key].map(word => (
                        <div key={`${key}-${word}`} style={{ border: '1px solid darkgrey', fontWeight: 700, backgroundColor: keywordColor[key], margin: 5, padding: 3, borderRadius: 5, display: 'inline-block' }}>{word}</div>
                    ))}
                </div>
            ))}
        </div>
    )


    return (
        <div style={{ display: 'flex', borderBottom: '1px solid black', padding: 30, fontSize: 10 }}>
            <div style={{ width: '70%', textAlign: 'left', padding: 50, fontSize: 13,  marginRight:100 }}>
                <h1>{story.headline}</h1>
                <h3>{story.summary}</h3>
                <div style={{ padding: 20 }}>{story.paragraphs.split('.').map((p, i) => <div key={`para-${i}-${p}`}>{p}.</div>)}</div>
            </div>
            <div style={{ width: '30%' }}>
                <div style={{ backgroundColor: 'rgba(25,155,166,0.07)', border: '1px solid darkgrey', padding: 10 }}>
                    <h3>ADN Results</h3>
                    <div style={{ borderBottom: '1px solid darkgrey', width: '100%' }}></div>
                    {renderResults(story.adn)}
                </div>
                <div style={{ backgroundColor: 'lightyellow', borderLeft: '1px solid darkgrey', borderRight: '1px solid darkgrey', borderBottom: '1px solid darkgrey', padding: 10 }}>
                    <h3>AWS Results</h3>
                    <div style={{ borderBottom: '1px solid darkgrey', width: '100%' }}></div>
                    {renderResults(story.aws)}
                </div>

            </div>
        </div>
    )
}

export default Story;