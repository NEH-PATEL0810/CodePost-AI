export class RuntimeGuard {

    isSolutionPage() {

        return location.pathname
            .includes("post-solution");

    }

}
