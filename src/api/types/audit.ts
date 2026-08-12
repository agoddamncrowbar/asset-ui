export interface AuditSummary {
    id: number;
    timestamp: string;
    user_id: number;
    action: string;
    entity_type: string;
    entity_id: string;
    summary: string;
}

export interface AuditChange {
    field: string;
    old: any;
    new: any;
}

export interface AuditLog {
    id: number;
    timestamp: string;
    user_id: number;
    action: string;
    entity_type: string;
    entity_id: string;
    message: string;
    changes: AuditChange[];
}

export interface Pagination {
    total: number;
    limit: number;
    offset: number;
}