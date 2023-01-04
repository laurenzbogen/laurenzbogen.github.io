for file in *; do 
    if [ -f "$file" ]; then 
        ffmpeg -y -i "$file" -vf scale=iw*0.5:-1 -crf 23 "../$file" 
    fi 
done
