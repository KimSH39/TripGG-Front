import Family from '@/components/icons/Family';
import Couple from '@/components/icons/Couple';
import Alone from '@/components/icons/Alone';
import Leaf from '@/components/icons/Leaf';
import Activity from '@/components/icons/Activity';
import Pic from '@/components/icons/Pic';
import Art from '@/components/icons/Art';
import Eat from '@/components/icons/Eat';
import Emotion from '@/components/icons/Emotion';

export const allRegions = [
    { id: 'seoul_city', name: 'Seoul', category: 'seoul_full' },
    { id: 'incheon', name: 'Incheon', category: 'seoul_suburban' },
    { id: 'goyang', name: 'Goyang', category: 'gyeonggi' },
    { id: 'seongnam', name: 'Seongnam', category: 'seoul_suburban' },
    { id: 'gwacheon', name: 'Gwacheon', category: 'gyeonggi' },
    { id: 'gwangmyeong', name: 'Gwangmyeong', category: 'gyeonggi' },
    { id: 'gwangju', name: 'Gwangju', category: 'gyeonggi' },
    { id: 'guri', name: 'Guri', category: 'gyeonggi' },
    { id: 'gunpo', name: 'Gunpo', category: 'gyeonggi' },
    { id: 'gimpo', name: 'Gimpo', category: 'gyeonggi' },
    { id: 'namyangju', name: 'Namyangju', category: 'gyeonggi' },
    { id: 'dongducheon', name: 'Dongducheon', category: 'gyeonggi' },
    { id: 'bucheon', name: 'Bucheon', category: 'gyeonggi' },
    { id: 'suwon', name: 'Suwon', category: 'gyeonggi' },
    { id: 'siheung', name: 'Siheung', category: 'gyeonggi' },
    { id: 'ansan', name: 'Ansan', category: 'gyeonggi' },
    { id: 'anseong', name: 'Anseong', category: 'gyeonggi' },
    { id: 'anyang', name: 'Anyang', category: 'gyeonggi' },
    { id: 'yangju', name: 'Yangju', category: 'gyeonggi' },
    { id: 'yeoju', name: 'Yeoju', category: 'gyeonggi' },
    { id: 'osan', name: 'Osan', category: 'gyeonggi' },
    { id: 'yongin', name: 'Yongin', category: 'gyeonggi' },
    { id: 'uiwang', name: 'Uiwang', category: 'gyeonggi' },
    { id: 'uijeongbu', name: 'Uijeongbu', category: 'gyeonggi' },
    { id: 'icheon', name: 'Icheon', category: 'gyeonggi' },
    { id: 'paju', name: 'Paju', category: 'gyeonggi' },
    { id: 'pyeongtaek', name: 'Pyeongtaek', category: 'gyeonggi' },
    { id: 'pocheon', name: 'Pocheon', category: 'gyeonggi' },
    { id: 'hanam', name: 'Hanam', category: 'gyeonggi' },
    { id: 'hwaseong', name: 'Hwaseong', category: 'gyeonggi' },
    { id: 'gapyeong', name: 'Gapyeong', category: 'gyeonggi' },
    { id: 'yangpyeong', name: 'Yangpyeong', category: 'gyeonggi' },
    { id: 'yeoncheon', name: 'Yeoncheon', category: 'gyeonggi' },
];

export const travelTypeRegions: { [key: number]: string[] } = {
    1: ['seoul_full'], // For TravelTypeCard id 1 (Seoul)
    2: ['seoul_full', 'seoul_suburban', 'gyeonggi'], // For TravelTypeCard id 2 (Gyeonggi-do)
    3: ['seoul_full', 'seoul_suburban', 'gyeonggi'], // For TravelTypeCard id 3 (Seoul+Gyeonggi)
    4: ['seoul_full', 'seoul_suburban', 'gyeonggi', 'capital_complex'], // For TravelTypeCard id 4 (Others)
};

export const companions = [
    { id: 'family', icon: Family },
    { id: 'couple', icon: Couple },
    { id: 'Alone', icon: Alone },
];

export const travelStyles = [
    { id: 'Leaf', icon: Leaf },
    { id: 'activity', icon: Activity },
    { id: 'Pic', icon: Pic },
    { id: 'Art', icon: Art },
    { id: 'Eat', icon: Eat },
    { id: 'Emotion', icon: Emotion },
];
