
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { VOICES, SPEEDS } from './constants';
import { VoiceID } from './types';
import { generateSpeech } from './services/geminiService';
import { decode, decodeAudioData, encodeWAV } from './utils/audioUtils';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<VoiceID>('Puck');
  const [selectedVoiceName, setSelectedVoiceName] = useState('Gia Huy');
  const [selectedSpeed, setSelectedSpeed] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Background Music States
  const [bgMusicUrl, setBgMusicUrl] = useState('');
  const [isBgMusicPlaying, setIsBgMusicPlaying] = useState(false);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    setCharCount(text.length);
  }, [text]);

  const startProgress = () => {
    setProgress(0);
    progressIntervalRef.current = window.setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          return 98;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 200);
  };

  const completeProgress = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setProgress(100);
    setTimeout(() => setProgress(0), 1500);
  };

  const handleStopAudio = useCallback(() => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
    setIsAudioPlaying(false);
  }, []);

  const handleSpeak = async () => {
    if (!text.trim()) {
      setError("Vui lòng nhập văn bản.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAudioUrl(null);
    handleStopAudio();
    startProgress();

    try {
      const speedInstruction = SPEEDS.find(s => s.id === selectedSpeed)?.instruction || '';
      const base64Audio = await generateSpeech(text, selectedVoice, speedInstruction);
      
      const pcmData = decode(base64Audio);
      const wavBlob = encodeWAV(pcmData, 24000, 1);
      const url = URL.createObjectURL(wavBlob);
      setAudioUrl(url);

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const audioBuffer = await decodeAudioData(pcmData, audioContextRef.current, 24000, 1);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => setIsAudioPlaying(false);
      source.start();
      audioSourceRef.current = source;
      setIsAudioPlaying(true);
      completeProgress();
    } catch (err: any) {
      setError("Hệ thống xử lý lỗi, vui lòng kiểm tra lại văn bản.");
      setProgress(0);
    } finally {
      setIsLoading(false);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
  };

  const toggleBgMusic = () => {
    if (!bgMusicRef.current) return;
    if (isBgMusicPlaying) {
      bgMusicRef.current.pause();
    } else {
      bgMusicRef.current.play();
    }
    setIsBgMusicPlaying(!isBgMusicPlaying);
  };

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgMusicUrl(url);
      setIsBgMusicPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 px-4 py-8 md:py-12 flex flex-col items-center font-normal">
      <div className="max-w-7xl w-full mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 via-blue-500 to-green-500 rounded-xl shadow-sm flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-semibold uppercase italic tracking-tighter leading-none text-slate-900">
                Lâm Minh <span className="text-blue-600">STUDIO</span>
              </h1>
              <p className="text-slate-400 font-medium text-xs mt-1 tracking-[0.15em] uppercase">Phòng thu âm AI cao cấp</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Input & Studio Controls */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[650px] relative">
              
              {/* Progress Bar Overlay */}
              {isLoading && (
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 z-50">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 via-blue-500 to-green-500 transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                  <div className="absolute top-4 right-6 text-[10px] font-semibold text-blue-600 bg-white px-3 py-1 rounded-full shadow-sm border border-blue-50">
                    ĐANG TẠO: {progress}%
                  </div>
                </div>
              )}

              {/* Status Bar */}
              <div className="px-6 py-4 border-b bg-slate-50 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Tốc độ đọc</span>
                  <div className="flex bg-white rounded-lg p-1 border border-slate-200 mt-1 shadow-sm">
                    {SPEEDS.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSpeed(s.id)}
                        className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${
                          selectedSpeed === s.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="text-right">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Số từ</div>
                    <div className="text-xl font-semibold text-blue-600 leading-none mt-1">{wordCount}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Ký tự</div>
                    <div className="text-xl font-semibold text-red-600 leading-none mt-1">{charCount}</div>
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nhập nội dung cần chuyển đổi tại đây..."
                className="flex-1 p-8 resize-none outline-none text-xl font-normal leading-relaxed placeholder-slate-200 bg-transparent border-none focus:ring-0"
              />

              {/* Control Bar */}
              <div className="p-6 bg-slate-50 border-t flex justify-between items-center">
                <button
                  onClick={() => setText('')}
                  className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                >
                  Xóa văn bản
                </button>
                
                <div className="flex gap-3">
                  {audioUrl && (
                    <a
                      href={audioUrl}
                      download={`Lam-Minh-Studio-${new Date().getTime()}.wav`}
                      className="px-6 py-3 bg-green-500 text-white text-sm font-medium rounded-xl hover:bg-green-600 transition-all flex items-center gap-2 shadow-sm"
                    >
                      Lưu File
                    </a>
                  )}
                  {isAudioPlaying && (
                    <button
                      onClick={handleStopAudio}
                      className="px-6 py-3 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-all"
                    >
                      Dừng
                    </button>
                  )}
                  <button
                    onClick={handleSpeak}
                    disabled={isLoading || !text.trim()}
                    className={`px-8 py-3 rounded-xl font-semibold shadow-md transition-all flex items-center gap-2 text-base uppercase tracking-tight ${
                      isLoading || !text.trim()
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                        : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-50'
                    }`}
                  >
                    {isLoading ? `Vui lòng chờ...` : "Phát âm thanh"}
                  </button>
                </div>
              </div>
            </div>

            {/* Mixer Section - Light Theme */}
            <div className="bg-white rounded-[24px] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-semibold uppercase tracking-widest text-slate-800 mb-6 flex items-center gap-3">
                  <span className="p-1.5 bg-blue-600 text-white rounded text-[10px]">STUDIO</span> TRÌNH PHÁT NHẠC NỀN
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-[10px] font-semibold uppercase text-slate-400 tracking-[0.1em]">Đường dẫn nhạc (URL)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={bgMusicUrl}
                        onChange={(e) => setBgMusicUrl(e.target.value)}
                        placeholder="Link file âm thanh .mp3..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                      />
                      <button 
                        onClick={toggleBgMusic}
                        className={`px-5 rounded-lg text-xs font-semibold transition-all ${isBgMusicPlaying ? 'bg-red-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                      >
                        {isBgMusicPlaying ? 'Tắt' : 'Bật'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-semibold uppercase text-slate-400 tracking-[0.1em]">Tải nhạc từ máy tính</label>
                    <div className="flex items-center gap-4">
                      <label className="flex-1 flex items-center justify-center border border-dashed border-slate-300 bg-slate-50 rounded-lg p-2.5 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all">
                        <input type="file" accept="audio/*" onChange={handleMusicUpload} className="hidden" />
                        <span className="text-[11px] font-medium text-blue-600">CHỌN TẬP TIN ÂM THANH</span>
                      </label>
                    </div>
                  </div>
                </div>
                <audio ref={bgMusicRef} src={bgMusicUrl} loop />
              </div>
            </div>
          </div>

          {/* RIGHT: Voice Library */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-[10px] font-semibold uppercase text-slate-400 tracking-[0.2em] px-2 flex justify-between items-center">
              <span>HỆ THỐNG GIỌNG ĐỌC</span>
              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px]">15 LỰA CHỌN</span>
            </h2>
            
            <div className="grid grid-cols-1 gap-3 max-h-[1150px] overflow-y-auto pr-2 custom-scrollbar">
              {VOICES.map((voice, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedVoice(voice.id);
                    setSelectedVoiceName(voice.name);
                  }}
                  className={`relative p-4 rounded-[20px] border text-left transition-all duration-200 flex items-center gap-4 overflow-hidden ${
                    selectedVoice === voice.id && selectedVoiceName === voice.name
                      ? 'bg-blue-50 border-blue-400 shadow-sm z-10'
                      : 'bg-white border-slate-100 hover:border-slate-200 shadow-none'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm bg-gradient-to-br ${voice.color} text-white opacity-90`}>
                    {voice.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800 text-base leading-tight">{voice.title}</span>
                        <span className={`text-[7px] font-semibold uppercase px-1.5 py-0.5 rounded text-white ${
                          voice.gender === 'Nam' ? 'bg-blue-500' : 'bg-pink-500'
                        }`}>
                          {voice.subType}
                        </span>
                      </div>
                      <span className="text-[9px] font-medium text-slate-400 mt-0.5 uppercase tracking-wide">{voice.name} - {voice.gender}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1.5 font-normal leading-snug line-clamp-2">{voice.description}</p>
                  </div>

                  {selectedVoice === voice.id && selectedVoiceName === voice.name && (
                    <div className="absolute top-2 right-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Copyright Section - Professional Light */}
            <div className="mt-8 p-8 bg-white rounded-[24px] border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-base mb-5 text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                BẢN QUYỀN HỆ THỐNG
              </h3>
              <div className="space-y-3 text-slate-500 text-[11px] font-medium tracking-normal">
                <p className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  Sản phẩm: Lâm Minh Studio Pro
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  Phiên bản ứng dụng: 2026
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Công nghệ: Xử lý giọng nói đa luồng
                </p>
                <div className="pt-6 border-t border-slate-100 mt-6 text-center">
                  <p className="text-xl text-slate-900 font-semibold tracking-widest uppercase italic">Lâm Minh 2026</p>
                  <p className="text-[8px] text-slate-400 mt-1 uppercase font-semibold">Hệ thống xử lý âm thanh kỹ thuật số</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default App;
