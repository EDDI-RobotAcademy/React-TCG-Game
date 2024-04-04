import React from 'react';

const AudioPlayer: React.FC<{ url: string }> = ({ url }) => {
    return (
        <audio controls autoPlay style={{ display: 'none' }}>
            <source src={url} type="audio/mpeg" />
        </audio>
    );
};

export default AudioPlayer;
