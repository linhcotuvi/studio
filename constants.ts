
import { VoiceOption } from './types';

export interface ExtendedVoiceOption extends VoiceOption {
  avatar: string;
  subType: string;
  title: string;
}

export const VOICES: ExtendedVoiceOption[] = [
  /* 12 GIỌNG NAM - ƯU TIÊN ẤM ÁP */
  { 
    id: 'Puck', 
    name: 'Gia Huy', 
    gender: 'Nam', 
    title: 'Nam Ấm Áp',
    description: 'Giọng nam ấm áp, nhẹ nhàng, phù hợp cho tâm sự và kể chuyện.',
    color: 'from-blue-400 to-blue-500',
    avatar: '👦',
    subType: 'Ấm Áp'
  },
  { 
    id: 'Charon', 
    name: 'Minh Đức', 
    gender: 'Nam', 
    title: 'Nam Trầm Ấm',
    description: 'Giọng nam trầm, dày và ấm áp, mang phong cách đĩnh đạc.',
    color: 'from-slate-400 to-slate-500',
    avatar: '👨‍💼',
    subType: 'Trầm Ấm'
  },
  { 
    id: 'Puck', 
    name: 'Thanh Tùng', 
    gender: 'Nam', 
    title: 'Nam Truyền Cảm',
    description: 'Giọng nam giàu cảm xúc, truyền cảm hứng mạnh mẽ.',
    color: 'from-cyan-400 to-cyan-500',
    avatar: '🎙️',
    subType: 'Truyền Cảm'
  },
  { 
    id: 'Charon', 
    name: 'Văn Hùng', 
    gender: 'Nam', 
    title: 'Nam Thuyết Minh',
    description: 'Giọng nam trung niên, đọc chuẩn, âm vực ấm và bền bỉ.',
    color: 'from-emerald-400 to-emerald-500',
    avatar: '🧔',
    subType: 'Thuyết Minh'
  },
  { 
    id: 'Puck', 
    name: 'Bảo Nam', 
    gender: 'Nam', 
    title: 'Nam Ấm Nhẹ',
    description: 'Giọng nam trẻ, nhẹ nhàng như lời thì thầm, rất dễ nghe.',
    color: 'from-indigo-400 to-indigo-500',
    avatar: '🧥',
    subType: 'Ấm Nhẹ'
  },
  { 
    id: 'Charon', 
    name: 'Đức Anh', 
    gender: 'Nam', 
    title: 'Nam Trầm Sâu',
    description: 'Giọng nam rất trầm, sâu lắng, phù hợp lồng tiếng phim.',
    color: 'from-gray-400 to-gray-500',
    avatar: '👓',
    subType: 'Trầm Sâu'
  },
  { 
    id: 'Puck', 
    name: 'Minh Triết', 
    gender: 'Nam', 
    title: 'Nam Hiền Hòa',
    description: 'Giọng đọc điềm đạm, hiền hòa, tạo cảm giác tin cậy.',
    color: 'from-teal-400 to-teal-500',
    avatar: '👨',
    subType: 'Hiền Hòa'
  },
  { 
    id: 'Charon', 
    name: 'Hải Đăng', 
    gender: 'Nam', 
    title: 'Nam Vững Chãi',
    description: 'Giọng nam vang, vững chãi, phù hợp đọc tin tức thời sự.',
    color: 'from-blue-500 to-blue-600',
    avatar: '🏢',
    subType: 'Vững Chãi'
  },
  { 
    id: 'Fenrir', 
    name: 'Quốc Bảo', 
    gender: 'Nam', 
    title: 'Nam Mạnh Mẽ',
    description: 'Giọng nam nội lực, mạnh mẽ nhưng vẫn giữ được độ ấm.',
    color: 'from-red-400 to-red-500',
    avatar: '💪',
    subType: 'Mạnh Mẽ'
  },
  { 
    id: 'Puck', 
    name: 'Tiến Đạt', 
    gender: 'Nam', 
    title: 'Nam Trẻ Trung',
    description: 'Giọng nam sinh viên năng động, tươi sáng và ấm áp.',
    color: 'from-blue-300 to-blue-400',
    avatar: '👨‍🎓',
    subType: 'Trẻ Trung'
  },
  { 
    id: 'Charon', 
    name: 'Tuấn Kiệt', 
    gender: 'Nam', 
    title: 'Nam Lịch Lãm',
    description: 'Giọng nam sang trọng, lịch lãm, phù hợp cho Podcast cao cấp.',
    color: 'from-slate-500 to-slate-600',
    avatar: '👔',
    subType: 'Lịch Lãm'
  },
  { 
    id: 'Fenrir', 
    name: 'Hoàng Nam', 
    gender: 'Nam', 
    title: 'Nam Sôi Nổi',
    description: 'Giọng nam tốc độ cao, hào hứng, phù hợp review phim.',
    color: 'from-orange-400 to-orange-500',
    avatar: '🎤',
    subType: 'Sôi Nổi'
  },
  /* 3 GIỌNG NỮ */
  { 
    id: 'Kore', 
    name: 'Thùy Chi', 
    gender: 'Nữ', 
    title: 'Nữ Tình Cảm',
    description: 'Giọng nữ ngọt ngào, mượt mà và vô cùng sâu lắng.',
    color: 'from-pink-400 to-pink-500',
    avatar: '👩',
    subType: 'Tình Cảm'
  },
  { 
    id: 'Zephyr', 
    name: 'Linh Anh', 
    gender: 'Nữ', 
    title: 'Nữ Trẻ Trung',
    description: 'Giọng nữ trong trẻo, hiện đại, phong cách tươi mới.',
    color: 'from-green-400 to-green-500',
    avatar: '👩‍🎨',
    subType: 'Trẻ Trung'
  },
  { 
    id: 'Kore', 
    name: 'Mai Phương', 
    gender: 'Nữ', 
    title: 'Nữ Chuyên Nghiệp',
    description: 'Giọng nữ chuẩn, thanh lịch, phù hợp đọc bản tin chuyên sâu.',
    color: 'from-purple-400 to-purple-500',
    avatar: '👩‍💼',
    subType: 'Chuyên Nghiệp'
  },
];

export const SPEEDS = [
  { id: 'slow', label: 'Chậm', instruction: 'Hãy nói với tốc độ rất chậm, nhấn nhá rõ ràng từng chữ: ' },
  { id: 'normal', label: 'Vừa', instruction: 'Hãy nói với tốc độ tự nhiên, trôi chảy: ' },
  { id: 'fast', label: 'Nhanh', instruction: 'Hãy nói với tốc độ nhanh, dồn dập và hào hứng: ' },
];
