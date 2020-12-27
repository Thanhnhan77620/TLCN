export interface HistoryExam {
    id: number;
    startedAt: Date,
    finishedAt: Date,
    scoreListening: number,
    scoreReading: number,
    examId: number,
    examTitle?: string,
}