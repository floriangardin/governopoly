import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface GameStartProps {
  onStart: () => void;
  companyContext: {
    name: string;
    industry: string;
    employees: number;
    revenue: string;
    founded: number;
    headquarters: string;
    dataTeamSize: number;
    description: string;
  };
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const GameStart: React.FC<GameStartProps> = ({ onStart, companyContext }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  useEffect(() => {
    // Play background music when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set volume to 30%
      
      // Attempt to play the audio
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playback started successfully');
          })
          .catch(error => {
            // Autoplay might be blocked by browser policies
            console.error('Audio playback failed:', error);
            setAudioError('Audio autoplay was prevented by your browser. Click anywhere to start the music.');
            
            // Add a click handler to start audio when user interacts with the page
            const startAudio = () => {
              if (audioRef.current) {
                audioRef.current.play()
                  .then(() => {
                    document.removeEventListener('click', startAudio);
                    setAudioError(null);
                  })
                  .catch(err => console.error('Still failed to play audio:', err));
              }
            };
            
            document.addEventListener('click', startAudio);
          });
      }
    }

    // Cleanup function to stop audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      // Remove any click listeners
      document.removeEventListener('click', () => {});
    };
  }, []);

  // Toggle music playback
  const toggleMusic = () => {
    setIsMusicPlaying(prev => !prev);
  };
  
  // Effect to handle music play/pause based on state
  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Background music playback failed:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  return (
    <Container>
      <audio ref={audioRef} src="/main_menu.mp3" loop preload="auto" />
      {audioError && <AudioMessage>{audioError}</AudioMessage>}
      
      <HeaderContainer>
      <CompanyLogoImage 
          src="/logo.png" 
          alt="Nine Lives Insurance logo"
          style={{ width: '150px', height: '150px' }}
        />
        <Title>Nine Lives Insurance</Title>
        <MusicButton onClick={toggleMusic}>
          {isMusicPlaying ? '🔊' : '🔇'}
        </MusicButton>
      </HeaderContainer>
      
      
      <Description>
      You’re the newly appointed Chief Data Officer. Your role is to guide Nine Lives through data chaos, one paw-step at a time. Expect surprises in your inbox and remember : data is your territory now.
      </Description>
    
      
      <YourRole>
        <RoleTitle>Your Role as Chief Data Officer</RoleTitle>
        <RoleDescription>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}>
              Emails come from across the company (and a few sassy cats) will ask for your decisions.
            </li>
            <li style={{ marginBottom: '10px' }}>
              Your choices will affect budget, data quality, profit, and reputation.
            </li>
            <li>
              Survive tough choices, messy data, and the occasional cyber-catastrophe.
            </li>
          </ul>
        </RoleDescription>
      </YourRole>
      
      <StartButton onClick={onStart}>
        Start
      </StartButton>
      
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #35adb6;
  margin-bottom: 8px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: #5f6368;
  margin-bottom: 30px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 20px;
  color: #3c4043;
`;

const CompanyCard = styled.div`
  width: 100%;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  background-color: #35adb6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
`;

const CompanyName = styled.h3`
  font-size: 24px;
  color: #3c4043;
  margin: 0;
`;

const CompanyDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #5f6368;
  text-align: center;
  margin-bottom: 20px;
`;

const CompanyStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const StatItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #5f6368;
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #3c4043;
`;

const YourRole = styled.div`
  width: 100%;
  background: #e8f7f8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  border-left: 4px solid #35adb6;
`;

const RoleTitle = styled.h3`
  font-size: 20px;
  color: #35adb6;
  margin-top: 0;
  margin-bottom: 10px;
`;

const RoleDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #3c4043;
  margin: 0;
`;

const CompanyLogoImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 15px;
`;

const StartButton = styled.button`
  background: #35adb6;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 15px 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 30px 0;
  transition: background 0.2s;
  
  &:hover {
    background: #2d9198;
  }
`;

const Rules = styled.div`
  width: 100%;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  
  h3 {
    color: #35adb6;
    margin-top: 0;
  }
  
  ul {
    padding-left: 20px;
    
    li {
      margin-bottom: 10px;
      color: #3c4043;
    }
  }
`;

const AudioMessage = styled.div`
  background: rgba(53, 173, 182, 0.1);
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  color: #35adb6;
  font-size: 14px;
  width: 100%;
  border: 1px solid #35adb6;
`;

const MusicButton = styled.button`
  background: #f1f3f4;
  border: 1px solid #dadce0;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  position: absolute;
  right: 0;
  
  &:hover {
    background: #e8f7f8;
    border-color: #35adb6;
  }
  
  &:active {
    background: #ceeaed;
  }
`;

export default GameStart; 