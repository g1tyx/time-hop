import {Requirement} from "@/engine/requirements/Requirement";

export class MultiRequirement {
    constructor(public requirements: Requirement[]) {
    }

    public isCompleted() {
        return this.requirements.every(requirement => {
            return requirement.isCompleted();
        });
    }

}
