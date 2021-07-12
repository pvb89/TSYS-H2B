import fs from 'fs';
import * as tfn from '@tensorflow/tfjs-node';
import { NodeFileSystem } from "@tensorflow/tfjs-node/dist/io/file_system";
import { TARGET_CLASSES } from '../helpers/enum.helper';
import { resultIF } from '../helpers/interfaces.helper';

class PredictService {

    async loadModel(): Promise<tfn.GraphModel> {
        const handler: NodeFileSystem = tfn.io.fileSystem(`${__dirname}/../model/model.json`);
        return await tfn.loadGraphModel(handler);

    }

    getImg(file: any): tfn.Tensor<tfn.Rank> {
        const image = fs.readFileSync(file);
        return tfn.node.decodeImage(image)
            .resizeNearestNeighbor([300, 300]) // change the image size
            .expandDims()
            .toFloat()
    }

    getTop3(prediction: any): resultIF {
        return Array.from(prediction)
            .map(function (p: any, i) {
                return {
                    probability: p,
                    category: TARGET_CLASSES[i]
                };
            }).sort(function (a, b) {
                return b.probability - a.probability;
            }).slice(0, 3);
    }

}

export default PredictService;