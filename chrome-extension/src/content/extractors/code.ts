export function extractCode(): string {
    // Try CodeMirror 6 (modern LeetCode might use it in some contexts)
    const cmContent = document.querySelector('.cm-content');
    if (cmContent) {
        const lines = cmContent.querySelectorAll('.cm-line');
        return Array.from(lines).map(line => line.textContent || '').join('\n');
    }
    
    // Try Monaco editor (LeetCode standard)
    const viewLines = document.querySelector('.view-lines');
    if (viewLines) {
        const lines = viewLines.querySelectorAll('.view-line');
        return Array.from(lines).map(line => {
            // Replace non-breaking spaces with regular spaces which Monaco might use
            return (line.textContent || '').replace(/\u00A0/g, ' ');
        }).join('\n');
    }
    
    // Try CodeMirror 5 (older/fallback)
    const cm5 = document.querySelector('.CodeMirror-code');
    if (cm5) {
        const lines = cm5.querySelectorAll('.CodeMirror-line');
        return Array.from(lines).map(line => {
            // cm5 often uses empty spaces or zero-width chars, we take textContent
            return (line.textContent || '').replace(/\u200B/g, ''); 
        }).join('\n');
    }
    
    return "";
}