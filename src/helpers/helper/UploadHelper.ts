import * as path from 'path';
import * as fs from 'fs';
import * as formidable from 'formidable';
import { Config } from '../../Config';

export class UploadHelper {

    /**
     * Upload files input
     * @param req 
     * @param nameInput 
     * @param pathUpload 
     * @param name 
     */
    public upload(req, nameInput: string, pathUpload: string, name?: string) {
        return new Promise((resolve, reject) => {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                var old_path = files[nameInput].path;
                var file_size = files[nameInput].size;
                var file_ext = files[nameInput].name.split('.').pop();

                var index = old_path.lastIndexOf('/') + 1;
                var file_name = old_path.substr(index);
                var newName = ((name) ? name : file_name) + '.' + file_ext;
                var new_path = path.join(Config.DIR, 'storage/', pathUpload, '/' + newName);

                if (Config.DEBUG) {
                    console.log(new_path);
                }

                fs.readFile(old_path, (err, data) => {
                    fs.writeFile(new_path, data, (err) => {
                        fs.unlink(old_path, (err) => {
                            if (err) {
                                reject({ success: false });
                            } else {
                                resolve({
                                    success: true,
                                    path: new_path,
                                    file: newName
                                });
                            }
                        });
                    });
                });
            });
        });
    }

    /**
     * Remove files to server
     * @param pathRemove 
     */
    public remove(pathRemove: string) {
        return new Promise((resolve, reject) => {
            var new_path = path.join(Config.DIR, 'storage/', pathRemove);
            fs.unlink(new_path, function (err) {
                if (err) {
                    reject({ success: false });
                } else {
                    resolve({ success: true });
                }
            });
        });
    }

}