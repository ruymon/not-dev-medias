import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Subjects } from "@/types/subjects";

interface SubscribedSubjectsStore {
	subscribedSubjects: Subjects;
	addSubscribedSubject: (subject: Subjects[keyof Subjects]) => void;
	removeSubscribedSubject: (code: string) => void;
}

export const useSubscribedSubjectsStore = create(
	persist<SubscribedSubjectsStore>(
		(set) => ({
			subscribedSubjects: {},
			addSubscribedSubject: (subject) =>
				set((state) => ({
					subscribedSubjects: {
						...state.subscribedSubjects,
						[subject.code]: subject,
					},
				})),
			removeSubscribedSubject: (code) =>
				set((state) => {
					const { [code]: _, ...subscribedSubjects } = state.subscribedSubjects;
					return { subscribedSubjects };
				}),
		}),
		{
			name: "subscribed-subjects-store",
		},
	),
);
