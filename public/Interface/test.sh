file="$1"
info=$(sox $file -n stat 2>&1)
full_length=$(echo "$info" | sed -n 's#^Length (seconds):[^0-9]*\([0-9.]*\).*$#\1#p')
seconds=$(echo $full_length | cut -f1 -d.)

if [ -n "$seconds" ]; then
    milliseconds=$(echo $full_length | cut -f2 -d. | cut -c -3)

    result=$(($seconds * 1000))
    result=$(($result + $milliseconds))

    echo "$result"
    exit
fi

echo "0"
exit