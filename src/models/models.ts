enum ItemType {
  DIRECTORY,
  FILE,
  LINK,
  REPORT,
}

class Item {
  constructor(readonly name: string, readonly size: number, readonly type: ItemType) {}
}

export class ReportFile extends Array<Directory | Report> {
  constructor(readonly name: string) {
    super();
  }
}

export class Directory extends Item {
  readonly contents: Item[];

  constructor(name: string, size: number) {
    super(name, size, ItemType.DIRECTORY);
    this.contents = [];
  }

  public addItem(item: Item) {
    this.contents.push(item);
  }
}

export class File extends Item {
  constructor(name: string, size: number) {
    super(name, size, ItemType.FILE);
  }
}

export class Link extends Item {
  readonly target: string;

  constructor(name: string, size: number, target: string) {
    super(name, size, ItemType.LINK);
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
