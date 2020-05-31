// Java Interoperability

declare class Java {
    static type: (type: string) => any;
    static extend: (data: any) => any;
}

const bigInteger = Java.type("java.math.BigInteger");

assert(bigInteger.valueOf(666).toString() === "666", "bigInteger.valueOf failed");

const IntArray = Java.type("int[]");
const intArray = new IntArray(3);

intArray[0] = 14;

assert(intArray[0] === 14, "intArray failed");

const byteArrayInputStream = Java.type("java.io.ByteArrayInputStream");
const javaString = Java.type("java.lang.String");
const inputStream = new byteArrayInputStream(new javaString("streamData").getBytes("UTF-8"));
const bufferedReader = Java.type("java.io.BufferedReader");
const inputStreamReader = Java.type("java.io.InputStreamReader");
const stringBuffer = Java.type("java.lang.StringBuffer");

function read(inputStream: any) {
    const inReader = new bufferedReader(new inputStreamReader(inputStream));
    let inputLine;
    const response = new stringBuffer();

    while ((inputLine = inReader.readLine()) != null) {
        response.append(inputLine);
    }

    inReader.close();

    return response.toString();
}

assert(read(inputStream) === "streamData", "inputStream test failed");

const SaxParserFactory = Java.type("javax.xml.parsers.SAXParserFactory");
const saxParserFactory = SaxParserFactory.newInstance();
saxParserFactory.setNamespaceAware(true);
const saxParser = saxParserFactory.newSAXParser();

// Collections

type Employee = {
    name: string;
    role: string;
};

const employees = new Map<number, Employee>();
employees.set(1, { name: "Peter", role: "Software developer" });
employees.set(2, { name: "John", role: "Test engineer" });
employees.set(3, { name: "Michael", role: "Team leader" });

const secondEmployee = employees.get(2);
assert(secondEmployee !== undefined && secondEmployee.name === "John", "map.get failed");

employees.clear();
assert(employees.size === 0, "map.clear or map.size failed");

const set = new Set<number>();
set.add(1);
set.add(2);
set.add(2);

assert(set.has(2), "set.has failed");
assert(set.size === 2, "set.size failed");

// Regular expressions

const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const regexp = /[A-E]/gi;

assert(
    JSON.stringify(text.match(regexp)) ===
        JSON.stringify(["A", "B", "C", "D", "E", "a", "b", "c", "d", "e"]),
    "Regexp.match failed"
);

// Eval

eval("console.log('eval')");

// String Literals

assert(`test ${2}` === "test 2", "string literal failed");

// JSON

assert(
    JSON.stringify(JSON.parse('{"result":true,"count":47}')) == '{"result":true,"count":47}',
    "JSON.stringify or JSON.parse failed"
);

// Performance

console.time("performance test");

const testArray = [];

for (let i: number = 0; i < 10000; i++) {
    for (let i: number = 0; i < 10000; i++) {
        testArray.push("");
    }
}

console.timeEnd("performance test");

// Test Utils

function assert(condition: boolean, errorMessage: string): void {
    if (condition === false) {
        throw new Error(errorMessage);
    }
}
