import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfileView {
    quizResults: Array<QuizResult>;
    surveyCompleted: boolean;
    bookmarked: Array<bigint>;
}
export interface CareerPath {
    id: bigint;
    professionalRecognition: Array<string>;
    guaranteedOutcomes: Array<string>;
    title: string;
    degreeProgram: string;
    description: string;
    degreeType: string;
    specializations: Array<string>;
    location: string;
}
export interface QuizResult {
    completionPercentage: bigint;
    selectedStreams: Array<string>;
}
export interface backendInterface {
    addBookmark(careerId: bigint): Promise<void>;
    findSimilarCareersByStream(stream: string): Promise<Array<CareerPath>>;
    getBookmarkedCareers(): Promise<Array<CareerPath>>;
    getUserProfile(): Promise<UserProfileView>;
    removeBookmark(careerId: bigint): Promise<void>;
    submitQuizResults(selectedStreams: Array<string>, completionPercentage: bigint): Promise<void>;
}
