'use client';
import React from 'react';
import { Document, Font, Page, Path, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';

export default function Certificate({
  courseName,
  full_name,
  authorName,
}: {
  courseName: string;
  full_name: string;
  authorName: string;
}) {
  Font.register({
    family: 'Calligraffitti',
    format: 'truetype',
    fonts: [{ src: '/fonts/Calligraffitti-Regular.ttf' }],
  });

  Font.register({
    family: 'Lato',
    fonts: [{ src: '/fonts/Lato-Light.ttf' }],
  });

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fdfbf8',
      padding: '85px 41px 0px 41px',
      fontFamily: 'Lato',
      fontSize: '18px',
      lineHeight: '150%',
      position: 'relative',
    },
    icon: { paddingBottom: '100px', fontSize: '15px' },
    certificateHeading: { paddingBottom: '64px', fontSize: '28px' },
    section: { color: '#53423c', textAlign: 'center', width: '80%', alignSelf: 'center' },
    courseName: { padding: '10px 10px 11px 10px', backgroundColor: '#faf4f0', marginBottom: '32px', fontSize: '18px' },
    fullName: { padding: '6px', border: '1px solid #EFE8E7', fontSize: '30px', fontFamily: 'Calligraffitti' },
    quote: { color: '#53423c', textAlign: 'center', width: '80%', alignSelf: 'center', position: 'relative' },
    calligraffitti: { fontFamily: 'Calligraffitti' },
  });

  return (
    <Document language='pl-PL'>
      <Page
        size='A4'
        style={styles.page}
        wrap
      >
        <View style={styles.section}>
          <RoseIcon />
          <Text style={styles.icon}>
            Kierunek <Text style={styles.calligraffitti}>Dzierganie</Text>
          </Text>
          <Text style={styles.certificateHeading}>
            <Text style={styles.calligraffitti}>Certyfikat</Text> ukończenia kursu
          </Text>
        </View>
        <View style={styles.quote}>
          <Text style={styles.courseName}>{courseName}</Text>
          <QuoteIcon />
        </View>
        <View style={styles.section}>
          <Text style={{ paddingBottom: '32px', fontSize: '14px' }}>Przez</Text>
          <Text style={styles.fullName}>{full_name}</Text>
        </View>
        <View>
          <Text
            style={{ width: '37.5%', position: 'absolute', bottom: -100, left: 0, color: '#9A827A', fontSize: '12px' }}
          >
            Instruktor
          </Text>
          <Text
            style={{
              width: '37.5%',
              position: 'absolute',
              bottom: -135,
              left: 0,
              border: '1px solid #EFE8E7',
              borderRadius: '6px',
              padding: '6px',
              fontSize: '14px',
            }}
          >
            {authorName}
          </Text>
          <Text
            style={{ width: '37.5%', position: 'absolute', bottom: -100, right: 0, color: '#9A827A', fontSize: '12px' }}
          >
            Data
          </Text>
          <Text
            style={{
              width: '37.5%',
              position: 'absolute',
              bottom: -135,
              right: 0,
              border: '1px solid #EFE8E7',
              borderRadius: '6px',
              padding: '6px',
              fontSize: '14px',
            }}
          >
            {new Date().toLocaleDateString('pl-PL')}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

function RoseIcon() {
  return (
    <Svg
      width='64'
      height='23'
      style={{ alignSelf: 'center', marginBottom: '11px' }}
      viewBox='0 0 128 46'
    >
      <Path
        fill='#53423C'
        d='M127.862 22.377l.033-.113c1.326-5.138.405-9.35-1.915-12.462-1.033-1.387-2.342-2.522-3.808-3.432v-.01c-.09-.063-.191-.113-.292-.17-.135-.078-.269-.156-.41-.23-2.229-1.269-4.436-2.212-6.599-2.87-2.038-1.173-4.476-2.072-7.34-2.605-6.088-1.14-10.654-.197-13.9 2.072-3.09 2.157-4.87 5.425-5.7 8.936-.046.061-.096.123-.147.185-3.285 4.46-4.886 9.935-4.004 15.197.028.158.062.32.095.478-8.53 3.442-23.29 7.143-39.583 7.048 2.954-.87 6.756-2.432 8.424-5.015.815-1.258 1.034-2.612.652-4.027-.433-1.612-1.348-2.084-2.039-2.202-3.678-.612-9.918 8.138-11.743 10.84a.832.832 0 00-.113.264C26.68 33.587 13.24 30.408 1.317 22.86a.843.843 0 00-.904 1.42c4.582 2.904 9.379 5.168 14.282 6.909 0 .1 0 .196.033.297.978 3.112 4.448 13.288 8.144 13.754.09.012.185.017.28.017.675 0 1.54-.303 2.303-1.544.77-1.247.95-2.606.528-4.044-.792-2.724-3.577-5.144-6.032-6.824 8.335 2.314 16.838 3.23 24.942 3.23 16.186 0 30.8-3.645 39.387-7.077 1.353 4.482 4.627 8.61 10.199 11.598 9.137 4.897 17.028 4.161 22.869 1.37 5.757-2.746 9.542-7.497 10.519-10.732v-.029l.011-.01c.804-2.326 1.09-5.6-.022-8.818h.006zm-76.96 2.42c.051 0 .101 0 .152.012.298.05.528.376.69.977.254.949.113 1.82-.443 2.673-1.567 2.42-5.84 3.982-9.12 4.757 3.554-4.903 7.166-8.419 8.721-8.419zM24.366 40.13c.28.971.168 1.853-.343 2.684-.326.528-.64.775-.943.736-1.472-.185-4.021-4.695-6.083-10.598 2.92 1.685 6.566 4.409 7.369 7.178zm96.29-32.737c.135.073.264.146.399.224 1.409.831 2.639 1.887 3.594 3.168 1.696 2.274 2.578 5.307 2.033 9.087a14.16 14.16 0 00-.809-1.185c-.735-.95-1.651-1.837-2.74-2.645-.264-2.853-1.157-5.617-2.814-8.032a17.125 17.125 0 00-.955-1.246c.444.19.882.398 1.298.623l-.006.006zm-9.469 26.89c-6.627.079-13.625-2.814-17.36-5.1-1.64-1.005-3.122-3.403-4.004-6.576a21.103 21.103 0 01-.455-2.055 7.724 7.724 0 011.398-2.511c1.169-1.415 2.983-2.645 5.605-3.499-.056.157-.112.309-.162.466-1.843 5.628-1.23 9.256.926 11.44 2.084 2.107 5.364 2.578 8.155 2.578 6.032 0 10.092-4.156 11.609-7.941.747-1.865.954-3.841.247-5.246a2.95 2.95 0 00-1.663-1.471c2.5.64 4.488 1.528 6.055 2.572a18.968 18.968 0 01-.113 3.24c-.612 5.196-3.201 10.312-6.969 13.794a19.525 19.525 0 01-3.263.31h-.006zm.769 1.629c-1.477.955-3.077 1.668-4.768 2.078-3.695.887-7.475-.135-10.66-2.263-3.19-2.13-5.711-5.313-6.88-8.599-.123-.354-.23-.702-.325-1.056.927 1.994 2.162 3.628 3.64 4.533 3.897 2.38 11.204 5.425 18.246 5.34.248 0 .5-.016.747-.028v-.005zm-8.8-15.602c.09.483.404.82.747 1.039.331.213.752.36 1.207.455a.83.83 0 10.354-1.623c-.309-.068-.5-.14-.612-.202.079-.118.236-.292.511-.511 1.157-.927 3.69-2.14 7.582-3.41.876-.286 1.488-.286 1.893-.168.381.112.645.343.825.696.393.781.371 2.196-.303 3.881-1.326 3.314-4.864 6.897-10.064 6.897-2.724 0-5.386-.483-6.97-2.084-1.51-1.527-2.292-4.363-.528-9.755.174-.528.37-1.033.595-1.522 1.679-.365 3.617-.601 5.847-.663 4.178-.123 7.615.202 10.446.837-.68-.067-1.432.034-2.247.303-3.908 1.275-6.7 2.567-8.104 3.69-.359.287-.662.59-.876.921-.213.326-.376.747-.286 1.219h-.017zm19.915.067c.084-.707.129-1.415.14-2.123.511.472.961.96 1.354 1.46a11.14 11.14 0 011.561 2.736c-1.258 4.43-3.347 7.323-5.858 9.132a13.063 13.063 0 01-2.656 1.466c2.965-3.578 4.92-8.127 5.453-12.67h.006zm-7.2-14.652a14.272 14.272 0 013.078 3.235c1.224 1.78 1.993 3.796 2.358 5.914-3.796-2.118-9.306-3.41-17.123-3.185-1.736.05-3.32.202-4.769.444 3.561-5.442 10.407-7.498 16.456-6.403v-.005zm-21.286-1.82c2.612-1.825 6.352-2.763 11.564-1.983-6.02.248-11.316 2.69-15.265 6.313.888-1.713 2.095-3.207 3.701-4.33zm-5.144 8.441l.034-.146c4.554-5.863 12.367-9.789 21.465-8.334-5.504.494-10.918 3.302-13.715 8.716-3.572.904-6.11 2.437-7.74 4.409-.156.19-.308.387-.448.584-.073-1.747.045-3.527.398-5.234l.006.005zm36.871 18.343v.017l-.012.016c-.803 2.702-4.218 7.15-9.654 9.745-5.375 2.566-12.704 3.308-21.37-1.337-6.043-3.24-9.059-7.807-9.85-12.536-.624-3.74.134-7.643 1.97-11.165a24.553 24.553 0 00.27 5.038c-.657 2.32-.432 4.83.416 7.217 1.297 3.65 4.06 7.116 7.526 9.43 3.47 2.314 7.716 3.516 11.968 2.493 2.847-.685 5.431-2.134 7.643-4.083 2.135-.443 4.179-1.269 6.021-2.6 2.32-1.674 4.257-4.122 5.622-7.509.225 1.96-.051 3.82-.556 5.263l.006.01z'
      ></Path>
    </Svg>
  );
}

function QuoteIcon() {
  return (
    <Svg
      width='20'
      height='21'
      viewBox='0 0 40 42'
      style={{ position: 'absolute', right: 16, top: -14 }}
    >
      <Path
        fill='#EFE8E7'
        d='M15.844 2.404c2.557 1.885 3.461 4.81 3.208 8.29C12.3 14.077 6.17 14.83 7.532 7.342c1.2-6.6 6.477-6.6 8.312-4.937zm18.875 0c2.449 1.805 3.424 4.411 3.339 7.473-3.856 4.202-12.98 4.775-11.652-2.536 1.2-6.6 6.478-6.6 8.313-4.937z'
      ></Path>
      <Path
        stroke='#EFE8E7'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M1.625 41.337c7.767-8.01 16.748-21.32 17.427-30.642m0 0c.253-3.481-.65-6.406-3.208-8.29C14.009.74 8.73.74 7.53 7.34c-1.361 7.489 4.769 6.735 11.52 3.354zm0 0a45.97 45.97 0 002.073-1.108m0 29.5c7.89-8.136 16.69-20.512 16.933-29.21m0 0c.085-3.062-.89-5.668-3.34-7.473C32.885.741 27.607.741 26.407 7.341c-1.329 7.311 7.796 6.738 11.652 2.536zm0 0c.495-.54.904-1.14 1.192-1.79'
      ></Path>
    </Svg>
  );
}
