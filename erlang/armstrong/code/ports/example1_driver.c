#include <stdio.h>
typedef unsigned char byte;

int twice(int);
int sum(int, int);

int read_cmd(byte *buf);
int write_cmd(byte *buf, int len);

int main() {
    int fn, arg1, arg2, result;
    byte buf[100];

    while (read_cmd(buf) > 0) {
        fn = buf[0];
        if (fn == 1) {
            arg1 = buf[1];
            result = twice(arg1);
            //fprintf(stderr, "twice(%d) returns %d\n", arg1, result);

        } else if (fn == 2) {
            arg1 = buf[1];
            arg2 = buf[2];
            result = sum(arg1, arg2);
            //fprintf(stderr, "sum(%d, %d) returns %d\n", arg1, arg2, result);

        } else {
            fprintf(stderr, "invalid fn: %d\n", fn);
        }

        buf[0] = result;
        write_cmd(buf, 1);
    }
    return 0;
}
