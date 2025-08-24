import Family from '@/components/icons/Family';
import Couple from '@/components/icons/Couple';
import Alone from '@/components/icons/Alone';
import Leaf from '@/components/icons/Leaf';
import Activity from '@/components/icons/Activity';
import Pic from '@/components/icons/Pic';
import Art from '@/components/icons/Art';
import Eat from '@/components/icons/Eat';
import Emotion from '@/components/icons/Emotion';

export const regions = [
    { id: 'suwon', name: '수원' },
    { id: 'gapyeong', name: '가평' },
    { id: 'uijeongbu', name: '의정부' },
    { id: 'namyangju', name: '남양주' },
    { id: 'pangyo', name: '판교' },
    { id: 'paju', name: '파주' },
    { id: 'seongnam', name: '성남' },
    { id: 'anyang', name: '안양' },
    { id: 'yongin', name: '용인' },
    { id: 'goyang', name: '고양' },
    { id: 'bucheon', name: '부천' },
    { id: 'hwaSeong', name: '화성' },
];

export const companions = [
    { id: 'family', name: '가족과 함께', icon: Family, desc: '온 가족이 함께하는' },
    { id: 'couple', name: '연인과 함께', icon: Couple, desc: '달콤한 둘만의' },
    { id: 'Alone', name: '나홀로 여행', icon: Alone, desc: '혼자만의 자유로운' },
];

export const travelStyles = [
    { id: 'Leaf', name: '힐링', icon: Leaf, desc: '자연, 한적함' },
    { id: 'activity', name: '액티비티', icon: Activity, desc: '체험, 레저, 액티비티' },
    { id: 'Pic', name: '사진 명소', icon: Pic, desc: 'SNS 핫플, 인생샷' },
    { id: 'Art', name: '전시/예술', icon: Art, desc: '미술관, 박물관' },
    { id: 'Eat', name: '식도락', icon: Eat, desc: '맛집 탐방' },
    { id: 'Emotion', name: '감성', icon: Emotion, desc: '레트로, 감성 카페' },
];
