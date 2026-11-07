export type CheckStatus = 'ok' | 'warn' | 'error';

export type ValidationDetail = {
    location: string;
    note?: string;
};

export type ValidationCheck = {
    status: CheckStatus;
    message: string;
    details?: ValidationDetail[];
    hint?: string;
};

export type ImportValidation = {
    fileName: string;
    fileMeta: string;
    checks: ValidationCheck[];
};

export type RoadmapPreviewSection = {
    number: string;
    name: string;
    topicCount: number;
};

export type NewRoadmapImport = ImportValidation & {
    confirmLabel: string;
    preview: RoadmapPreviewSection[];
};

export type RoadmapDiffChange = 'added' | 'changed' | 'removed';

export type RoadmapDiffEntry = {
    change: RoadmapDiffChange;
    location: string;
    topicKey: string;
    note?: string;
};

export type RoadmapDiff = {
    entries: RoadmapDiffEntry[];
    unchangedCount: number;
    note: string;
};

export type RoadmapMatch = {
    fileKey: string;
    roadmapName: string;
};

export type UpdatedRoadmapImport = ImportValidation & {
    confirmLabel: string;
    match: RoadmapMatch;
    diff: RoadmapDiff;
};

export type InvalidRoadmapImport = ImportValidation;

export type ImportPreview =
    | { kind: 'new'; validation: NewRoadmapImport }
    | { kind: 'update'; validation: UpdatedRoadmapImport }
    | { kind: 'invalid'; validation: InvalidRoadmapImport };
