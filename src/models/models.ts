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
  isDirectory = false;
  readonly fullPath: string;
  constructor(
    readonly name: string,
    readonly size: number = 0,
    readonly parent: Directory | null,
    readonly type: ItemType,
    readonly icon: ItemTypeIcon
  ) {
    this.fullPath = parent?.fullPath ? `${parent.fullPath}${name}/` : name;
    this.totalSize = size;
    this.isDirectory = type === ItemType.DIRECTORY;
  }
}

export class ReportFile {
  name: string;
  directory: Directory;
  report: Report;

  constructor(name?: string, directory?: Directory, report?: Report) {
    this.name = name || 'null';
    this.directory = directory || new Directory('null', -1, null);
    this.report = report || new Report(-1, -1);
  }
}

export class Directory extends Item {
  nFiles = 0;
  nDirectories = 0;
  totalContentSizes = {
    ARCHIVE: 0,
    BINARY: 0,
    DISK_IMAGE: 0,
    DOCUMENT: 0,
    FOLDER: 0,
    LINK: 0,
    MUSIC: 0,
    OTHER: 0,
    PICTURE: 0,
    VIDEO: 0,
  } as { [key: string]: number };

  readonly contents = [] as Item[];
  constructor(name: string, size: number, parent: Directory | null) {
    super(name, size, parent, ItemType.DIRECTORY, ItemTypeIcon.FOLDER);
  }
  public addItem(item: Item) {
    this.contents.push(item);
    this.totalSize += item.totalSize;
    if (item.isDirectory) {
      this.nDirectories++;
      const itemAsDirectory = item as Directory;
      for (const type in this.totalContentSizes) {
        this.totalContentSizes[type] += itemAsDirectory.totalContentSizes[type];
      }
    } else {
      this.nFiles++;
      this.totalContentSizes[ItemTypeIcon[item.icon]] += item.size;
    }
  }
}

export class File extends Item {
  constructor(name: string, size: number, parent: Directory) {
    super(name, size, parent, ItemType.FILE, File.determineIcon(name));
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
      case 'appimage':
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
      case 'json':
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
      case 'rmd':
      case 'sqlite':
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
      case 'm4p':
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
      case 'vob':
        return ItemTypeIcon.VIDEO;
      default:
        return ItemTypeIcon.OTHER;
    }
  };
}

export class Link extends Item {
  readonly target: string;

  constructor(name: string, size: number, parent: Directory, target: string) {
    super(name, size, parent, ItemType.LINK, ItemTypeIcon.LINK);
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
