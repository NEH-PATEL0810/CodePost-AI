// // export class MonacoInjector {
// //     inject(markdown: string) {
// //         const script = document.createElement("script");
// //         script.textContent = `
// // (() => {
// //     console.log("[CodePost] Injected script running");
// //     const monaco = window.monaco;
// //     if(!monaco){
// //         console.log("[CodePost] Monaco missing");
// //         return;
// //     }
// //     const models = monaco.editor.getModels();
// //     console.log("[CodePost] Models:", models.length);
// //     const markdownModel = models.find(model => {
// //         const lang = (typeof model.getLanguageId === 'function' ? model.getLanguageId() : '').toLowerCase();
// //         return lang === 'markdown';
// //     }) || models.find(model => {
// //         const val = model.getValue();
// //         return val.includes('# Intuition') || 
// //                val.includes('Describe your') || 
// //                val.includes('solve this problem');
// //     }) || models[0];

// //     if(!markdownModel){
// //         console.log("[CodePost] Markdown model missing");
// //         return;
// //     }

// //     markdownModel.setValue(${JSON.stringify(markdown)});
// //     console.log("[CodePost] Markdown injected");
// // })();
// // `;
// //         document.documentElement.appendChild(script);
// //         script.remove();
// //     }
// // }

// export class MonacoInjector {

//     inject(markdown: string) {

//         console.log("[Injector] Creating script");

//         const script = document.createElement("script");

// //         script.textContent = `
// // (() => {

// //     document.body.setAttribute(
// //         "codepost-test",
// //         "running"
// //     );

// // })();
// // `;
// script.textContent = `
// (() => {

// console.log("========== CODEPOST ==========");

// console.log("window.monaco =", window.monaco);

// console.log("window keys containing monaco");

// Object.keys(window)
// .filter(x => x.toLowerCase().includes("monaco"))
// .forEach(console.log);

// console.log("==============================");

// })();
// `;

//         document.documentElement.appendChild(script);

//         script.remove();

//         console.log("[Injector] Script appended");

//     }

// }


export class MonacoInjector {
    inject(markdown: string) {

        const script = document.createElement("script");

        script.textContent = `
(() => {

console.log("===== CODEPOST START =====");

try {

    console.log("window.monaco =", window.monaco);

    const models = window.monaco.editor.getModels();

    console.log("Models =", models.length);

    const model = models[0];

    console.log("Before:");
    console.log(model.getValue().substring(0,100));

    model.setValue(${JSON.stringify(markdown)});

    console.log("After:");
    console.log(model.getValue().substring(0,100));

    console.log("SUCCESS");

}
catch(e){
    console.error(e);
}

})();               
`;

        document.documentElement.appendChild(script);
        script.remove();
    }
}