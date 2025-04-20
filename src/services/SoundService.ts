import { useEffect, useState } from 'react';

// Sound types
export type SoundType = 'music' | 'effects';

// Sound files
const SOUNDS = {
  music: {
    mainMenu: '/main_menu.mp3',
    mainMusic: '/main_music.mp3',
  },
  effects: {
    click: '/click.ogg',
    alarm: '/alarm.ogg',
  }
};

// Audio instances
const audioInstances: { [key: string]: HTMLAudioElement } = {};

// Mute state (persisted in localStorage)
let soundMuted = localStorage.getItem('soundMuted') === 'true';

// Track if audio playback has been permitted by user interaction
let isAudioEnabled = false;
// Queue of sounds waiting to be played after user interaction
const pendingAudioQueue: { key: string, loop: boolean, volume: number }[] = [];

// Track the currently active music
let activeMusic: { key: string, volume: number } | null = null;

// Check if this is a mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Create a silent audio element for unlocking
const createSilentAudio = () => {
  const audio = new Audio();
  // A super short silent MP3 data URL 
  audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjMyLjEwNAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAAQABAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TLzM/Q0dLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigD//2Q==';
  audio.preload = 'auto';
  audio.volume = 0;
  audioInstances['__silent__'] = audio;
};

// Create silent audio to help with unlocking audio
createSilentAudio();

// Function to play multiple silent sounds to unlock audio on iOS/mobile
const unlockMobileAudio = () => {
  // Create multiple silent audio elements with different sources
  // This helps with iOS Safari which is especially strict
  const sounds = [
    audioInstances['__silent__'],
    new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjMyLjEwNAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAAQABAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TLzM/Q0dLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigD//2Q==')
  ];
  
  // Play them all with promise chaining to ensure they play in sequence
  let playPromise = Promise.resolve();
  sounds.forEach(sound => {
    playPromise = playPromise
      .then(() => {
        if (sound.paused) {
          // Set volume to 0 to ensure it's silent
          sound.volume = 0;
          return sound.play()
            .catch(e => console.warn('Failed to play unlock sound:', e));
        }
        return Promise.resolve();
      });
  });
  
  // Try again with a slight delay - this helps on some iOS versions
  setTimeout(() => {
    sounds.forEach(sound => {
      if (sound.paused) {
        sound.volume = 0;
        sound.play().catch(() => {});
      }
    });
  }, 200);
};

// Handler for user interaction to enable audio
const enableAudio = () => {
  console.log('User interaction detected, enabling audio');
  
  // First try to play multiple silent audio to unlock audio on mobile
  unlockMobileAudio();
  
  isAudioEnabled = true;
  
  // Process the queue after a delay - longer delay for mobile
  const delay = isMobile ? 300 : 50;
  
  setTimeout(() => {
    console.log(`Processing ${pendingAudioQueue.length} queued sounds`);
    
    // Make a copy of the queue before processing
    const queueCopy = [...pendingAudioQueue];
    pendingAudioQueue.length = 0; // Clear the original queue
    
    queueCopy.forEach(sound => {
      console.log(`Playing queued sound: ${sound.key}`);
      
      // Get sound details
      const soundType: SoundType = sound.key.startsWith('main') ? 'music' : 'effects';
      const src = SOUNDS[soundType][sound.key as keyof typeof SOUNDS[typeof soundType]];
      
      if (src) {
        // Get the audio element
        const audio = initAudio(sound.key, src, sound.loop, sound.volume);
        
        // If it's music, track it and stop other music
        if (soundType === 'music') {
          activeMusic = { key: sound.key, volume: sound.volume };
          
          Object.keys(SOUNDS.music).forEach(musicKey => {
            if (musicKey !== sound.key && audioInstances[musicKey]) {
              audioInstances[musicKey].pause();
              audioInstances[musicKey].currentTime = 0;
            }
          });
        }
        
        // Try to play the sound directly
        audio.play().catch(error => {
          console.error(`Failed to play ${sound.key} after unlock:`, error);
          
          // On mobile, we might need to try again with user interaction
          if (isMobile && error.name === 'NotAllowedError') {
            console.log('Mobile audio still blocked, will retry on next interaction');
            isAudioEnabled = false;
            pendingAudioQueue.push(sound);
            addUnlockListeners();
          }
        });
      }
    });
    
    // Notify components that audio is enabled
    window.dispatchEvent(new CustomEvent('audioEnabled'));
  }, delay);
  
  // Remove the event listeners
  removeUnlockListeners();
};

// Add all event listeners for unlocking audio
const addUnlockListeners = () => {
  // More comprehensive set of events for mobile devices
  document.addEventListener('click', enableAudio, { once: true });
  document.addEventListener('touchstart', enableAudio, { once: true });
  document.addEventListener('touchend', enableAudio, { once: true });
  
  // For iOS Safari, add listeners to all relevant elements
  if (isMobile) {
    document.addEventListener('touchmove', enableAudio, { once: true });
    
    // Add listeners to common interaction elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('touchstart', enableAudio, { once: true });
      el.addEventListener('touchend', enableAudio, { once: true });
      el.addEventListener('click', enableAudio, { once: true });
    });
  }
};

// Remove all unlock listeners
const removeUnlockListeners = () => {
  document.removeEventListener('click', enableAudio);
  document.removeEventListener('touchstart', enableAudio);
  document.removeEventListener('touchend', enableAudio);
  
  if (isMobile) {
    document.removeEventListener('touchmove', enableAudio);
    
    // Remove from interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach(el => {
      el.removeEventListener('touchstart', enableAudio);
      el.removeEventListener('touchend', enableAudio);
      el.removeEventListener('click', enableAudio);
    });
  }
};

// Add event listeners for user interaction
addUnlockListeners();

// Initialize audio elements
const initAudio = (key: string, src: string, loop: boolean = false, volume: number = 0.5): HTMLAudioElement => {
  if (!audioInstances[key]) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.loop = loop;
    audio.volume = volume;
    audioInstances[key] = audio;
  }
  audioInstances[key].loop = loop;
  audioInstances[key].volume = volume;
  return audioInstances[key];
};

// Play a sound
export const playSound = (key: string, loop: boolean = false, volume: number = 0.5): void => {
  const soundType: SoundType = key.startsWith('main') ? 'music' : 'effects';
  
  // Check if sound is muted
  if (soundMuted) {
    // Even if muted, still track the music that would be playing
    if (soundType === 'music') {
      activeMusic = { key, volume };
    }
    return;
  }
  
  // Get sound file path
  const src = SOUNDS[soundType][key as keyof typeof SOUNDS[typeof soundType]];
  if (!src) return;
  
  // If audio hasn't been enabled by user interaction yet, queue the sound
  if (!isAudioEnabled) {
    // Only queue each music key once, replacing any existing entry
    if (soundType === 'music') {
      const existingIndex = pendingAudioQueue.findIndex(item => item.key === key);
      if (existingIndex >= 0) {
        pendingAudioQueue[existingIndex] = { key, loop, volume };
      } else {
        pendingAudioQueue.push({ key, loop, volume });
      }
      activeMusic = { key, volume };
    } else if (soundType === 'effects') {
      // For effects, we can just add them to the queue
      pendingAudioQueue.push({ key, loop, volume });
    }
    
    console.log(`Queued ${key} sound to play after interaction`);
    return;
  }
  
  // Initialize or get existing audio element
  const audio = initAudio(key, src, loop, volume);
  
  // If it's music, stop other music first and update active music
  if (soundType === 'music') {
    // Update our active music tracker
    activeMusic = { key, volume };
    
    Object.keys(SOUNDS.music).forEach(musicKey => {
      if (musicKey !== key && audioInstances[musicKey]) {
        audioInstances[musicKey].pause();
        audioInstances[musicKey].currentTime = 0;
      }
    });
  }
  
  // Reset the audio to beginning if it's an effect (to allow rapid consecutive plays)
  if (soundType === 'effects') {
    audio.currentTime = 0;
  }
  
  // Play the sound
  audio.play().catch(error => {
    console.error(`Failed to play ${key} sound:`, error);
    
    // If it's an autoplay error, re-queue and re-enable audio
    if (error.name === 'NotAllowedError') {
      console.log('Audio playback was blocked. Re-adding to queue.');
      isAudioEnabled = false;
      pendingAudioQueue.push({ key, loop, volume });
      
      // Re-add our event listeners
      addUnlockListeners();
    }
  });
};

// Stop a sound
export const stopSound = (key: string): void => {
  if (audioInstances[key]) {
    audioInstances[key].pause();
    audioInstances[key].currentTime = 0;
    
    // If stopping the active music, clear the active music tracker
    if (activeMusic && activeMusic.key === key) {
      activeMusic = null;
    }
  }
};

// Toggle mute for a sound type
export const toggleMute = (type: SoundType): boolean => {
  soundMuted = !soundMuted;
  localStorage.setItem('soundMuted', soundMuted.toString());
  
  if (soundMuted) {
    // Pause all music when muting
    Object.keys(SOUNDS.music).forEach(key => {
      if (audioInstances[key]) {
        audioInstances[key].pause();
      }
    });
  } else if (activeMusic) {
    // When unmuting, restart the active music - make this more reliable
    const currentMusic = activeMusic; // Create a local reference that TypeScript knows is not null
    console.log(`Unmuting: Attempting to restart ${currentMusic.key}`);
    
    // Try to play directly using the audio element to bypass permission checks
    const src = SOUNDS.music[currentMusic.key as keyof typeof SOUNDS.music];
    if (src && isAudioEnabled) {
      const audio = initAudio(currentMusic.key, src, true, currentMusic.volume);
      
      // Stop other music first
      Object.keys(SOUNDS.music).forEach(key => {
        if (key !== currentMusic.key && audioInstances[key]) {
          audioInstances[key].pause();
          audioInstances[key].currentTime = 0;
        }
      });
      
      // On mobile, we may need to wait for another interaction
      if (isMobile) {
        // Create a one-time event to play on next interaction
        const playOnNextInteraction = () => {
          audio.play().catch(e => {
            console.error('Still failed to play after unmute:', e);
            isAudioEnabled = false;
            pendingAudioQueue.push({ 
              key: currentMusic.key, 
              loop: true, 
              volume: currentMusic.volume 
            });
            addUnlockListeners();
          });
          
          // Remove this listener after first interaction
          document.removeEventListener('touchstart', playOnNextInteraction);
          document.removeEventListener('touchend', playOnNextInteraction);
          document.removeEventListener('click', playOnNextInteraction);
        };
        
        // Add listeners for the next interaction
        document.addEventListener('touchstart', playOnNextInteraction, { once: true });
        document.addEventListener('touchend', playOnNextInteraction, { once: true });
        document.addEventListener('click', playOnNextInteraction, { once: true });
        
        // Also try to play now, it might work
        audio.play().catch(error => {
          console.log('Deferring playback to next interaction');
          // The error is expected, and we're already set up to handle it on next interaction
        });
      } else {
        // On desktop, we can just try to play directly
        audio.play().catch(error => {
          console.error(`Failed to restart music after unmuting:`, error);
          if (error.name === 'NotAllowedError') {
            // If audio permission denied, just queue for later
            isAudioEnabled = false;
            pendingAudioQueue.push({ 
              key: currentMusic.key, 
              loop: true, 
              volume: currentMusic.volume 
            });
            
            // Re-add event listeners
            addUnlockListeners();
          }
        });
      }
    } else if (!isAudioEnabled) {
      // If audio isn't enabled yet, make sure it's in the queue
      pendingAudioQueue.push({ 
        key: currentMusic.key, 
        loop: true, 
        volume: currentMusic.volume 
      });
    }
  }
  
  // To maintain the API, return the appropriate value based on type
  return soundMuted;
};

// Check if a sound type is muted
export const isMuted = (type: SoundType): boolean => {
  return soundMuted;
};

// Get current active music
export const getActiveMusic = (): { key: string, volume: number } | null => {
  return activeMusic;
};

// Check if audio is enabled
export const isAudioReady = (): boolean => {
  return isAudioEnabled;
};

// React hook for using sound service in components
export const useSoundService = () => {
  const [localSoundMuted, setLocalSoundMuted] = useState<boolean>(soundMuted);
  const [audioReady, setAudioReady] = useState<boolean>(isAudioEnabled);
  
  // Update audio ready state when it changes
  useEffect(() => {
    // Function to update state when audio is enabled
    const onAudioEnabled = () => {
      setAudioReady(true);
    };
    
    // If already enabled, just set state
    if (isAudioEnabled) {
      setAudioReady(true);
    } else {
      // Otherwise listen for the event
      window.addEventListener('audioEnabled', onAudioEnabled);
      
      // Also check periodically in case the event doesn't fire
      const intervalId = setInterval(() => {
        if (isAudioEnabled) {
          setAudioReady(true);
          clearInterval(intervalId);
        }
      }, 500);
      
      return () => {
        window.removeEventListener('audioEnabled', onAudioEnabled);
        clearInterval(intervalId);
      };
    }
  }, []);
  
  // Handle toggling music mute
  const toggleMusic = () => {
    const newState = toggleMute('music');
    setLocalSoundMuted(newState);
  };
  
  // Handle toggling effects mute
  const toggleEffects = () => {
    const newState = toggleMute('effects');
    setLocalSoundMuted(newState);
  };
  
  return {
    playSound,
    stopSound,
    toggleMusic,
    toggleEffects,
    isMusicMuted: localSoundMuted,
    isEffectsMuted: localSoundMuted,
    audioReady
  };
}; 