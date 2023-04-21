import { ReportFile, Report, Directory, File, Link } from '@/models/models';

interface rawReport {
  directories: number;
  files: number;
}

interface rawItem {
  name: string;
  size: number;
  type: string;
}

interface rawDirectory extends rawItem {
  contents?: Array<rawItem>;
}

interface rawLink extends rawItem {
  target: string;
}
interface rawFile extends rawItem {}

export class ReportFileParser {
  static parse(input: string, fileName: string): ReportFile {
    if (!input) throw 'No input';
    let obj;
    try {
      obj = JSON.parse(input);
    } catch {
      throw 'Not a valid JSON';
    }
    const directory = this.convertDirectory(obj.at(0), '');
    const report = this.convertReport(obj.at(1));
    return new ReportFile(fileName, directory, report);
  }

  private static convertReport(r: rawReport): Report {
    return new Report(r.directories, r.files);
  }

  private static convertLink(l: rawLink, parentPath: string): Link {
    return new Link(l.name, l.size, parentPath, l.target);
  }

  private static convertFile(f: rawFile, parentPath: string): File {
    return new File(f.name, f.size, parentPath);
  }

  private static convertDirectory(dir: rawDirectory, parentPath: string): Directory {
    const directory = new Directory(dir.name, dir.size, parentPath);

    if (!dir.contents) return directory;
    // this happens with the Powershellscript for empty folders
    if (typeof dir.contents === 'object' && !Array.isArray(dir.contents)) return directory;

    const contents: Array<rawItem> = dir.contents!;
    if (!contents.length) return directory;

    contents.forEach((e: rawItem) => {
      switch (e.type) {
        case 'directory':
          directory.addItem(this.convertDirectory(<rawDirectory>e, directory.fullPath));
          break;
        case 'file':
          directory.addItem(this.convertFile(<rawFile>e, directory.fullPath));
          break;
        case 'link':
          directory.addItem(this.convertLink(<rawLink>e, directory.fullPath));
          break;
        default:
          console.log(`UNKNOWN TYPE ${e.type}`);
      }
    });
    return directory;
  }
}
