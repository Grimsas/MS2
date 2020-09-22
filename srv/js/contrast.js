//Copy-Paste solution for luminance and constast ratio from stack overflow
//Plus my upgrade for iterations on object list and calculating higher value
// https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors



//Stack Overfrlow Begins
function luminanace(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1) {
    var lum1 = luminanace(rgb1[0], rgb1[1], rgb1[2]);
    var lum2 = luminanace(000, 000, 000);
    var lum3 = luminanace(255, 255, 255);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
        //Stack Overflow Ends
    var brighter = Math.max(lum1, lum3);
    var darker = Math.min(lum1, lum3);
    
    
         return {
            white: (brightest + 0.05)
            / (darkest + 0.05),
            black: (brighter + 0.05)
            / (darker + 0.05),
            
            
            
        };
        
}






