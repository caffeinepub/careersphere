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
    bookmarkedDegrees: Array<bigint>;
    quizResults: Array<QuizResult>;
    surveyCompleted: boolean;
    bookmarkedCareers: Array<bigint>;
}
export interface QuizResult {
    completionPercentage: bigint;
    selectedStreams: Array<string>;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
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
export interface UserData {
    principal: Principal;
    profile: UserProfileView;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBookmark(careerId: bigint): Promise<Result>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteUserProfile(principal: Principal): Promise<Result>;
    findSimilarCareersByStream(stream: string): Promise<Array<CareerPath>>;
    getAllCareers(): Promise<Array<CareerPath>>;
    getAllUserProfiles(): Promise<Array<UserData>>;
    getBookmarkedCareers(): Promise<Array<CareerPath>>;
    getCallerUserProfile(): Promise<UserProfileView | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfileView | null>;
    isCallerAdmin(): Promise<boolean>;
    removeBookmark(careerId: bigint): Promise<Result>;
    saveCallerUserProfile(profileView: UserProfileView): Promise<void>;
    submitQuizResults(selectedStreams: Array<string>, completionPercentage: bigint): Promise<Result>;
}
