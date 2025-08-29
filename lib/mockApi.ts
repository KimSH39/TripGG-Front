export interface Place {
    name: string;
    time: string;
    endTime: string;
    address: string;
    category: string;
    date: string; // ISO string for date
}

export interface TravelPlan {
    id: string;
    title: string;
    startDate: string; // ISO string
    endDate: string; // ISO string
    places: Place[];
}

const STORAGE_KEY = 'tripgg_plans';
const LATENCY = 500; // Simulate network latency of 500ms

const getStoredPlans = (): TravelPlan[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

const setStoredPlans = (plans: TravelPlan[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    }
};

export const savePlan = (plan: Omit<TravelPlan, 'id'>): Promise<TravelPlan> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const plans = getStoredPlans();
            const newPlan: TravelPlan = { ...plan, id: Date.now().toString() };
            plans.push(newPlan);
            setStoredPlans(plans);
            resolve(newPlan);
        }, LATENCY);
    });
};

export const getPlans = (): Promise<TravelPlan[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getStoredPlans());
        }, LATENCY);
    });
};

export const getPlanById = (id: string): Promise<TravelPlan | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const plans = getStoredPlans();
            const plan = plans.find((p) => p.id === id);
            resolve(plan);
        }, LATENCY);
    });
};
