export enum ItemType {
  DIRECTORY,
  FILE,
  LINK,
  REPORT,
}

export enum ItemTypeIcon {
  ARCHIVE,
  BINARY,
  DISK_IMAGE,
  DOCUMENT,
  FOLDER,
  LINK,
  MUSIC,
  OTHER,
  PICTURE,
  VIDEO,
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
    switch (name.split('.').at(-1)?.toLowerCase()) {
      case 'gz':
      case 'tar':
      case 'tgz':
      case 'xz':
      case 'zip':
        return ItemTypeIcon.ARCHIVE;
      case 'apk':
      case 'bin':
      case 'cs':
      case 'deb':
      case 'dll':
      case 'dmg':
      case 'exe':
      case 'jar':
      case 'msi':
      case 'run':
      case 'sh':
        return ItemTypeIcon.BINARY;
      case 'img':
      case 'iso':
      case 'ova':
      case 'vdi':
        return ItemTypeIcon.DISK_IMAGE;
      case 'accdb':
      case 'cfg':
      case 'csv':
      case 'db':
      case 'doc':
      case 'docx':
      case 'gcode':
      case 'html':
      case 'js':
      case 'kdbx':
      case 'log':
      case 'md':
      case 'ods':
      case 'odt':
      case 'one':
      case 'pdf':
      case 'php':
      case 'ppt':
      case 'pptx':
      case 'ps1':
      case 'rdg':
      case 'ts':
      case 'txt':
      case 'url':
      case 'vsd':
      case 'vue':
      case 'xls':
      case 'xlsx':
        return ItemTypeIcon.DOCUMENT;
      /* NOT POSSIBLE
      case '':
        return ItemTypeIcon.FOLDER;
      case '':
        return ItemTypeIcon.LINK;
      */
      case 'flac':
      case 'mp3':
      case 'wav':
      case 'wma':
        return ItemTypeIcon.MUSIC;
      case 'bmp':
      case 'gif':
      case 'jpeg':
      case 'jpg':
      case 'pdn':
      case 'png':
      case 'tif':
      case 'tiff':
        return ItemTypeIcon.PICTURE;
      case 'avi':
      case 'flv':
      case 'mov':
      case 'mp4':
        return ItemTypeIcon.VIDEO;
      default:
        return ItemTypeIcon.OTHER;
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
