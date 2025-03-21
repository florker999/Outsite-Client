interface IConstraint {
    isFulfilled(value: string): boolean,
    reward?: number,
}

export default class ValueAssessor {
    private constraints: IConstraint[] = [];
    private _maxAssessment: number;

    constructor(constraints: IConstraint[]) {
        this.constraints = constraints;
        this._maxAssessment = constraints.reduce((acc, constraint) => acc + (constraint.reward || 1), 0);
    }

    public assess(value: string) {
        let reward: number = 0;
        for (const constraint of this.constraints) {
            const constraintFulfilled = constraint.isFulfilled(value);
            if (constraintFulfilled)
                reward += constraint.reward || 1;
        }
        return reward;
    }

    public get maxAssessment(): number {
        return this._maxAssessment;
    }
}

export class PasswordAssessorBuilder {
    public static build() {
        const lengthConstraint: IConstraint = {
            isFulfilled: value => value.length > 8
        },
            digitConstraint: IConstraint = {
                isFulfilled: value => (value.match(/\d+/) !== null),
            },
            capitalLetterConstraint: IConstraint = {
                isFulfilled: value => (value.match(/[A-Z]+/) !== null),
            },
            otherCharacterConstraint: IConstraint = {
                isFulfilled: value => (value.match(/\W+/) !== null)
            };

        const constraints: IConstraint[] = [
            lengthConstraint,
            digitConstraint,
            capitalLetterConstraint,
            otherCharacterConstraint,
        ];
        const assessor = new ValueAssessor(constraints);
        return assessor;
    }
}