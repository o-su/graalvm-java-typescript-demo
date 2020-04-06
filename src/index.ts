declare class Java {
    static type: (type: string) => any;
}

const bigInteger = Java.type("java.math.BigInteger");

console.log("example", bigInteger.valueOf(666).toString());
