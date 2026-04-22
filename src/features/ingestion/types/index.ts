export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

export interface IngestionMetadata {
  language: string;
  framework: string;
  dependencies: string[];
}

export interface IngestionResponse {
  project_id: string;
  project_name: string;
  metadata: IngestionMetadata;
  file_tree: FileNode[];
  reports?: Record<string, any>;
  workbench_mode?: string;
  user_info?: any;
  status: string;
}
