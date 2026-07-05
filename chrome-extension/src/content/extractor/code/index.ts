import { debugLog } from "@/content/debug";
import { extractFromCodeMirror } from "./codemirror";

export function extractCode(): string {
    let code = "";

    try {
        const bridge = document.createElement("div");
        bridge.id = "codepost-extracted-code-bridge";
        bridge.style.display = "none";
        document.documentElement.appendChild(bridge);

        const script = document.createElement("script");
        script.textContent = `
            (function() {
                try {
                    let code = "";
                    if (window.monaco && window.monaco.editor) {
                        const models = window.monaco.editor.getModels();
                        if (models && models.length > 0) {
                            let mainModel = models[0];
                            for (let m of models) {
                                if (m.uri && m.uri.path && m.uri.path.indexOf('solution') !== -1) {
                                    mainModel = m;
                                    break;
                                }
                            }
                            code = mainModel.getValue();
                        }
                    }
                    if (!code) {
                        const cmContent = document.querySelector('.cm-content');
                        if (cmContent && cmContent.cmView && cmContent.cmView.view) {
                            code = cmContent.cmView.view.state.doc.toString();
                        }
                    }
                    if (!code) {
                        const editorEl = document.querySelector('.monaco-editor');
                        if (editorEl && editorEl.env && editorEl.env.editor) {
                            code = editorEl.env.editor.getValue();
                        }
                    }
                    document.getElementById('codepost-extracted-code-bridge').setAttribute('data-code', code || "");
                } catch (e) {
                    // Suppress injection errors
                }
            })();
        `;
        (document.head || document.documentElement).appendChild(script);
        script.remove();

        code = bridge.getAttribute("data-code") || "";
        bridge.remove();
    } catch (err) {
        debugLog("Injected code extraction error", err);
    }

    if (!code) {
        debugLog("Injected extraction empty, falling back to DOM parsing.");
        const result = extractFromCodeMirror();
        code = result.success ? result.code : "";
    }

    debugLog("Code Extraction Final", code);
    return code;
}
