import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SubscribedSubjectsStore {
	subscribedCodes: string[];
	toggleSubject: (code: string) => void;
}

type PersistedSubscribedSubjects = Pick<
	SubscribedSubjectsStore,
	"subscribedCodes"
>;

export const useSubscribedSubjectsStore = create<SubscribedSubjectsStore>()(
	persist(
		(set) => ({
			subscribedCodes: [],
			toggleSubject: (code) =>
				set(({ subscribedCodes }) => ({
					subscribedCodes: subscribedCodes.includes(code)
						? subscribedCodes.filter((subscribed) => subscribed !== code)
						: [...subscribedCodes, code],
				})),
		}),
		{
			name: "subscribed-subjects-store",
			version: 1,
			partialize: ({ subscribedCodes }): PersistedSubscribedSubjects => ({
				subscribedCodes,
			}),
			migrate: (persisted, version): PersistedSubscribedSubjects => {
				if (version === 0) {
					const { subscribedSubjects = {} } = persisted as {
						subscribedSubjects?: Record<string, unknown>;
					};
					return { subscribedCodes: Object.keys(subscribedSubjects) };
				}
				return persisted as PersistedSubscribedSubjects;
			},
		},
	),
);
