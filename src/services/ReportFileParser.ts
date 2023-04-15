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
    const directory = this.convertDirectory(obj.at(0));
    const report = this.convertReport(obj.at(1));
    return new ReportFile(fileName, directory, report);
  }

  private static convertReport(r: rawReport): Report {
    return new Report(r.directories, r.files);
  }

  private static convertLink(l: rawLink): Link {
    return new Link(l.name, l.size, l.target);
  }

  private static convertFile(f: rawFile): File {
    return new File(f.name, f.size);
  }

  private static convertDirectory(dir: rawDirectory): Directory {
    const directory = new Directory(dir.name, dir.size);
    (dir.contents || []).forEach((e) => {
      switch (e.type) {
        case 'directory':
          directory.contents.push(this.convertDirectory(<rawDirectory>e));
          break;
        case 'file':
          directory.contents.push(this.convertFile(<rawFile>e));
          break;
        case 'link':
          directory.contents.push(this.convertLink(<rawLink>e));
          break;
        default:
          console.log(`UNKNOWN TYPE ${e.type}`);
      }
    });
    return directory;
  }
}
