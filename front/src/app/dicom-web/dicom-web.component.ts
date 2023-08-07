import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DICOMViewerComponent} from 'ng-dicomviewer';
import {AuthService} from '../_services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';

declare const cornerstone;
declare const cornerstoneWADOImageLoader;

@Component({
  selector: 'app-dicom-web',
  templateUrl: './dicom-web.component.html',
  styleUrls: ['./dicom-web.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DicomWebComponent implements OnInit {
  form: FormGroup;
  response;
  ListF = [] as any;
  dat = [] as any;
  listFiles = [] as any;
  listFilesFinal = [] as any;
  file;
  @ViewChild(DICOMViewerComponent, {static: true}) viewPort: DICOMViewerComponent;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    this.getMyFiles();
    this.form = this.formBuilder.group({
      profile: ['']
    });
    console.log(event);
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone; // inicializa WADO Image loader
    console.log(cornerstone);
    // configura codecs e web workers
    cornerstoneWADOImageLoader.webWorkerManager.initialize({
      webWorkerPath: './assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
      taskConfiguration: {
        'decodeTask': {
          codecsPath: '../codecs/cornerstoneWADOImageLoaderCodecs.js'
        }
      }
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile').setValue(file);
      console.log(event);
      console.log(file);
    }
  }

  /**
   * Load selected DICOM images
   *
   * @param files list of selected dicom files
   */
    async getFileList(ListF) {
      console.log(ListF);
      for (let i = 0; i < 3; i++) {
        this.listFiles[i] = 'http://127.0.0.1:8000' + this.ListF[i].content;
        let response = await fetch(this.listFiles[i]);
        let data = await response.blob();
        let metadata = {
          type: 'application/dicom'
        };
        let file = new File([data], this.ListF[i].content, metadata);
        console.log(file);
        this.listFilesFinal[i] = file;
        console.log(this.listFilesFinal);
        console.log(this.listFilesFinal[i]);
      }
      console.log(this.listFilesFinal);
      this.loadDICOMImages(this.listFilesFinal);
      return this.listFiles;
    }

  /* --------------------------------------------------------------------*/
  public getMyFiles() {
    this.authService.getAllFiles().subscribe(data => {
      this.ListF = data as string [];
      console.log('my files');
      console.log(this.ListF);
      this.getFileList(this.ListF);
      /*this.createFile();*/
    }, error => {
      console.log('dsl my files');
      console.log(error);
    });
  }
/*  async  createFile() {
    let response = await fetch(this.dat[0]);
    let data = await response.blob();
    let metadata = {
      type: 'application/dicom'
    };
    let file = new File([data], 'file_name', metadata);
    console.log(file);
    this.listFiles[0] = file;
    console.log(this.listFiles);
    console.log(this.listFiles[0]);
    this.loadDICOMImages(this.listFiles);
    return file;
    // ... do something with the file or return it
  }*/

  /* --------------------------------------------------------------------*/
  loadDICOMImages(files: FileList) {
    if (files && files.length > 0) {
      console.log('files');
      console.log(files);
      const imageList = [] as any;
      const fileList: Array<File> = Array.from(files);
      fileList.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (b.name > a.name) {
          return -1;
        }
        return 0;
      });
      // cornerstoneWADOImageLoader.wadouri.fileManager.purge();
      cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.purge();
      // loop thru the File list and build a list of wadouri imageIds (dicomfile:)
      for (let i = 0; i < fileList.length; i++) {
        const dicomFile: File = fileList[i];
       /* console.log('dicomFile');
        console.log(dicomFile);*/
        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(dicomFile);
        imageList.push(imageId);
      }

      this.viewPort.resetAllTools();
      console.log(this.viewPort);
      console.log(this.viewPort.viewPort.currentImage);
      // now load all Images, using their wadouri
      this.viewPort.loadStudyImages(imageList);

    } else {
      alert('Choisissez les images DICOM à afficher.');
    }
  }

  /*  onSubmit() {
      const formData = new FormData();
      formData.append('file', this.form.get('profile').value);
      console.log(formData);
      console.log(formData);
      console.log();
      this.authService.upload(this.viewPort).subscribe(
        (res) => {
          this.response = res;
          console.log('upload c bon ');
          console.log(res);
        },
        (err) => {
          console.log('upload erreur');
          console.log(err);
        }
      );
    }*/
}

/*upload(fileList) {
  console.log(fileList);
  let requests = [];
  files.forEach((file) => {
    requests.push(this.uploadService.upload(fileList));
  });

  concat(...requests).subscribe(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
}*/


/*
function loadImage(imageId) {
  // Parse the imageId and return a usable URL (logic omitted)
  const url = parseImageId(imageId);

  // Create a new Promise
  const promise = new Promise((resolve, reject) => {
    // Inside the Promise Constructor, make
    // the request for the DICOM data
    const oReq = new XMLHttpRequest();
    oReq.open('get', url, true);
    oReq.responseType = 'arraybuffer';
    oReq.onreadystatechange = function(oEvent) {
      if (oReq.readyState === 4) {
        if (oReq.status === 200) {
          // Request succeeded, Create an image object (logic omitted)
          const image = createImageObject(oReq.response);

          // Return the image object by resolving the Promise
          resolve(image);
        } else {
          // An error occurred, return an object containing the error by
          // rejecting the Promise
          reject(new Error(oReq.statusText));
        }
      }
    };

    oReq.send();
  });
}*/
/*
loadDICOMImages(files: FileList) {
  if (files && files.length > 0) {
    console.log('files');
    console.log(files);
    const imageList = [] as any;
    const fileList: Array<File> = Array.from(files);
    fileList.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (b.name > a.name) {
        return -1;
      }
      return 0;
    });
    // cornerstoneWADOImageLoader.wadouri.fileManager.purge();
    cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.purge();
    // loop thru the File list and build a list of wadouri imageIds (dicomfile:)
    for (let i = 0; i < fileList.length; i++) {
      const dicomFile: File = fileList[i];
      console.log('dicomFile');
      console.log(dicomFile);
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(dicomFile);
      imageList.push(imageId);
    }

    this.viewPort.resetAllTools();
    console.log(this.viewPort);
    console.log(this.viewPort.viewPort.currentImage);
    // now load all Images, using their wadouri
    this.viewPort.loadStudyImages(imageList);

  } else {
    alert('Choisissez les images DICOM à afficher.');
  }
}*/
/*
public getMyFiles() {
  this.authService.getAllFiles().subscribe(data => {
    this.ListF = data as string [];
    console.log('my files');
    console.log(this.ListF);
    this.dat[0] = 'http://127.0.0.1:8000' + this.ListF[0].content;
    console.log(this.dat[0]);
    this.createFile();
    /!*      console.log('this.file');
          console.log(this.file);
          this.loadDICOMImages(this.dat[0]);*!/
  }, error => {
    console.log('dsl my files');
    console.log(error);
  });
}
async  createFile() {
  let response = await fetch(this.dat[0]);
  let data = await response.blob();
  let metadata = {
    type: 'application/dicom'
  };
  let file = new File([data], 'file_name', metadata);
  console.log(file);
  this.listFiles[0] = file;
  console.log(this.listFiles);
  console.log(this.listFiles[0]);
  this.loadDICOMImages(this.listFiles);
  return file;
  // ... do something with the file or return it
}*/
