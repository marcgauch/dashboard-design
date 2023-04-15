enum ItemType {
  DIRECTORY,
  DOCUMENT,
  FILE,
  LINK,
  REPORT,
}

export enum ItemTypeIcon {
  FILM,
  FOLDER,
  LINK,
  MUSIC,
  PICTURE,
  UNKNOWN,
}

export class Item {
  constructor(
    readonly name: string,
    readonly size: number,
    readonly type: ItemType,
    readonly icon: ItemTypeIcon
  ) {}
  isDirectory = () => this.type === ItemType.DIRECTORY;
}

export class ReportFile {
  name: string;
  directory: Directory;
  report: Report;

  constructor(name?: string, directory?: Directory, report?: Report) {
    this.name = name || 'null';
    this.directory = directory || new Directory('null', -1);
    this.report = report || new Report(-1, -1);
  }
}

export class Directory extends Item {
  readonly contents: Item[];

  constructor(name: string, size: number) {
    super(name, size, ItemType.DIRECTORY, ItemTypeIcon.FOLDER);
    this.contents = [];
  }

  public addItem(item: Item) {
    this.contents.push(item);
  }
}

export class File extends Item {
  constructor(name: string, size: number) {
    super(name, size, ItemType.FILE, File.determineIcon(name));
  }
  static determineIcon = (name: string) => {
    switch (name.split('.').at(-1)) {
      case 'jpg':
      case 'jpeg':
        return ItemTypeIcon.PICTURE;
      case 'mp3':
        return ItemTypeIcon.MUSIC;
      case 'mp4':
        return ItemTypeIcon.FILM;
      default:
        return ItemTypeIcon.UNKNOWN;
    }
  };
}

export class Link extends Item {
  readonly target: string;

  constructor(name: string, size: number, target: string) {
    super(name, size, ItemType.LINK, ItemTypeIcon.LINK);
    this.target = target;
  }
}

export class Report {
  readonly type = ItemType.REPORT;
  readonly directories: number;
  readonly files: number;

  constructor(directories: number, files: number) {
    this.directories = directories;
    this.files = files;
  }
}
