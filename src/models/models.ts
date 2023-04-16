export enum ItemType {
  DIRECTORY,
  FILE,
  LINK,
  REPORT,
}

export enum ItemTypeIcon {
  MOVIE,
  FOLDER,
  LINK,
  MUSIC,
  PICTURE,
  UNKNOWN,
}

export class Item {
  totalSize: number;
  constructor(
    readonly name: string,
    readonly size: number,
    readonly fullPath: string,
    readonly type: ItemType,
    readonly icon: ItemTypeIcon
  ) {
    this.totalSize = size;
  }
  isDirectory = () => this.type === ItemType.DIRECTORY;
}

export class ReportFile {
  name: string;
  directory: Directory;
  report: Report;

  constructor(name?: string, directory?: Directory, report?: Report) {
    this.name = name || 'null';
    this.directory = directory || new Directory('null', -1, 'null');
    this.report = report || new Report(-1, -1);
  }
}

export class Directory extends Item {
  readonly contents = [] as Item[];
  constructor(name: string, size: number, fullPath: string) {
    super(
      name,
      size,
      fullPath ? `${fullPath}${name}/` : name,
      ItemType.DIRECTORY,
      ItemTypeIcon.FOLDER
    );
  }
  public addItem(item: Item) {
    this.contents.push(item);
    this.totalSize += item.totalSize;
  }
}

export class File extends Item {
  constructor(name: string, size: number, fullPath: string) {
    super(
      name,
      size,
      fullPath ? `${fullPath}${name}` : name,
      ItemType.FILE,
      File.determineIcon(name)
    );
  }
  static determineIcon = (name: string) => {
    switch (name.split('.').at(-1)) {
      case 'jpg':
      case 'jpeg':
        return ItemTypeIcon.PICTURE;
      case 'mp3':
        return ItemTypeIcon.MUSIC;
      case 'mp4':
        return ItemTypeIcon.MOVIE;
      default:
        return ItemTypeIcon.UNKNOWN;
    }
  };
}

export class Link extends Item {
  readonly target: string;

  constructor(name: string, size: number, fullPath: string, target: string) {
    super(name, size, fullPath ? `${fullPath}${name}/` : name, ItemType.LINK, ItemTypeIcon.LINK);
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
