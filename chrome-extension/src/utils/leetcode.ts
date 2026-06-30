export function isProblemPage(url: string):boolean{
    return /^https:\/\/leetcode\.com\/problems\/[^/]+\/?$/.test(url);
}

export function isContestPage(url: string):boolean{
    return url.includes("/contest");
}

export function isDiscussPage(url: string):boolean{
    return url.includes("/discuss/");
}

