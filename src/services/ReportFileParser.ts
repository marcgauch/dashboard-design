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

const parseJSON = (input: string): Array<any> => {
  if (!input) throw 'No input';
  try {
    return JSON.parse(input);
  } catch (exception) {
    // tree on linux adds this error. this isn't beautiful nor useful. but so what.
    input = input.replaceAll('{"error": "error opening dir"}', '');
    return JSON.parse(input);
  }
};

export class ReportFileParser {
  static parse(input: string, fileName: string): ReportFile {
    const obj = parseJSON(input);
    const directory = this.convertDirectory(obj.at(0), null);
    const report = this.convertReport(obj.at(1));
    return new ReportFile(fileName, directory, report);
  }

  private static convertReport(r: rawReport): Report {
    return new Report(r.directories, r.files);
  }

  private static convertLink(l: rawLink, parentDirectory: Directory): Link {
    return new Link(l.name, l.size, parentDirectory, l.target);
  }

  private static convertFile(f: rawFile, parentDirectory: Directory): File {
    return new File(f.name, f.size, parentDirectory);
  }

  private static convertDirectory(dir: rawDirectory, parentDirectory: Directory | null): Directory {
    const directory = new Directory(dir.name, dir.size, parentDirectory);

    if (!dir.contents) return directory;
    // this happens with the Powershellscript for empty folders
    if (typeof dir.contents === 'object' && !Array.isArray(dir.contents)) return directory;

    const contents: Array<rawItem> = dir.contents!;
    if (!contents.length) return directory;

    contents.forEach((e: rawItem) => {
      switch (e.type) {
        case 'directory':
          directory.addItem(this.convertDirectory(<rawDirectory>e, directory));
          break;
        case 'file':
          directory.addItem(this.convertFile(<rawFile>e, directory));
          break;
        case 'link':
          directory.addItem(this.convertLink(<rawLink>e, directory));
          break;
        default:
          console.log(`UNKNOWN TYPE ${e.type}`);
      }
    });
    return directory;
  }
}
