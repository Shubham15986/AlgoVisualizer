import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SimpleVisualizationExporter from '../utils/simpleExporter';


const SimpleExportControls = ({ containerId }) => {
  const [exporter] = useState(() => new SimpleVisualizationExporter());
  const [isRecording, setIsRecording] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [message, setMessage] = useState('Ready to record');

  // choose default container id if not provided
  const targetId = useMemo(() => {
    if (containerId) return containerId;
    if (typeof document !== 'undefined') {
      if (document.getElementById('sort-visualization-container')) return 'sort-visualization-container';
      if (document.getElementById('search-visualization-container')) return 'search-visualization-container';
      if (document.getElementById('ds-visualization-container')) return 'ds-visualization-container';
    }
    return 'visualization-container';
  }, [containerId]);

  const handleStartRecording = () => {
    setMessage('Recording...');
    setIsRecording(true);
    setFrameCount(0);

  exporter.startRecording(500, targetId); // Capture every 500ms targeting correct container

    // Update frame count periodically
    const updateInterval = setInterval(() => {
      setFrameCount(exporter.frames.length);
    }, 500);
    // Store interval for cleanup
    exporter.updateInterval = updateInterval;
  };

  const handleStopRecording = () => {
    if (exporter.updateInterval) {
      clearInterval(exporter.updateInterval);
    }
    const totalFrames = exporter.stopRecording();
    setIsRecording(false);
    setFrameCount(totalFrames);
    setMessage(`Recording stopped. ${totalFrames} frames captured.`);
  };
  const handleExportGIF = () => {
    setMessage('Creating GIF...');
    exporter.exportAsGIF();
    setMessage('GIF exported successfully!');
  };

  const handleExportVideo = () => {
    setMessage('Creating video...');
    exporter.exportAsVideo();
    setMessage('Video exported successfully!');
  };

  return (
    // ✅ MODIFIED: Switched to the standard .theme-card class
    <div className="theme-card" style={{ textAlign: 'center' }}>
      <div className="theme-card-header">
        {/* ✅ MODIFIED: Removed inline style */}
        <h3>Export Visualization</h3>
      </div>
      
      {/* ✅ MODIFIED: Used theme variables for text color */}
      <p style={{ color: 'var(--theme-text-secondary)', margin: '0 0 1rem 0' }}>{message}</p>
      {frameCount > 0 && (
        <p style={{ color: 'var(--theme-accent)', fontSize: '0.9rem', marginTop: 0 }}>Frames captured: {frameCount}</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        {!isRecording ? (
          <button
            className="btn btn-primary" 
            onClick={handleStartRecording}
            style={{ backgroundColor: 'var(--theme-status-success)', borderColor: 'var(--theme-status-success)' }} // Keep brand color for start
          >
            Start Recording.
          </button>
        ) : (
          <button
            className="btn btn-primary" 
            onClick={handleStopRecording}
            style={{ backgroundColor: 'var(--theme-status-danger)', borderColor: 'var(--theme-status-danger)' }} // Keep brand color for stop
          >
            Stop Recording
          </button>
        )}

        <div style={{ display: 'flex', gap: '1rem', flexWrap:'wrap', justifyContent:'center' }}>
          <button
            onClick={handleExportGIF}
            disabled={frameCount === 0 || isRecording}
            className="btn btn-secondary" 
          >
            🎞️ Export GIF
          </button>
          <button
            onClick={handleExportVideo}
            disabled={frameCount === 0 || isRecording}
            className="btn btn-secondary" 
          >
            📹 Export Video
          </button>
        </div>
      </div>

      {/* ✅ MODIFIED: Used theme variables for instruction text color */}
      <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--theme-text-muted)', lineHeight: 1.5 }}>
        <div>**Instructions:**</div>
        <div>1. Click "Start Recording" before running your algorithm</div>
        <div>2. Run the sorting/searching algorithm</div>
        <div>3. Click "Stop Recording" when done</div>
        <div>4. Export as GIF or Video format</div>
      </div>
    </div>
  );
};

SimpleExportControls.propTypes = { containerId: PropTypes.string };
SimpleExportControls.defaultProps = { containerId: undefined };

export default SimpleExportControls;